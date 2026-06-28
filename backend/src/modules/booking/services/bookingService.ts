import { Op } from 'sequelize';
import Booking from '../models/Booking';
import BookingSlot from '../models/BookingSlot';
import Court from '../../venue/models/Court';
import Venue from '../../venue/models/Venue';
import User from '../../auth/models/User';
import { NotFoundError, BadRequestError } from '../../../common/errors/AppError';

// Đổi định dạng HH:mm ra số phút để so sánh
const timeToMinutes = (timeStr: string): number => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

// Kiểm tra 2 khung giờ có trùng nhau không
const isOverlapping = (
  start1: string,
  end1: string,
  start2: string,
  end2: string
): boolean => {
  const s1 = timeToMinutes(start1);
  const e1 = timeToMinutes(end1);
  const s2 = timeToMinutes(start2);
  const e2 = timeToMinutes(end2);
  return s1 < e2 && s2 < e1;
};

export const bookingService = {
  // Tạo đặt sân mới
  create: async (
    userId: string,
    payload: {
      courtId: string;
      date: string;
      slots: Array<{ startTime: string; endTime: string }>;
      couponCode?: string;
      paymentMethod: 'MOMO' | 'CASH_AT_VENUE';
    }
  ) => {
    const { courtId, date, slots, couponCode, paymentMethod } = payload;

    // 1. Kiểm tra sân thi đấu
    const court = await Court.findByPk(courtId, {
      include: [{ model: Venue, as: 'venue' }],
    });
    if (!court || court.status !== 'ACTIVE') {
      throw new NotFoundError('Không tìm thấy sân thi đấu hoạt động.');
    }

    const venue = (court as any).venue;
    if (!venue) {
      throw new NotFoundError('Không tìm thấy thông tin địa điểm.');
    }

    // 2. Tính tổng số giờ thuê và tổng tiền
    let totalHours = 0;
    for (const slot of slots) {
      const sMin = timeToMinutes(slot.startTime);
      const eMin = timeToMinutes(slot.endTime);
      if (sMin >= eMin) {
        throw new BadRequestError(`Khung giờ bắt đầu ${slot.startTime} phải nhỏ hơn kết thúc ${slot.endTime}.`);
      }
      totalHours += (eMin - sMin) / 60;
    }
    const totalPrice = totalHours * court.pricePerHour;

    // 3. Kiểm tra trùng lịch (Overlap Check)
    // Tìm các booking hợp lệ của sân đó trong ngày đó
    const existingBookings = await Booking.findAll({
      where: {
        courtId,
        date,
        status: { [Op.ne]: 'CANCELLED' },
      },
      include: [{ model: BookingSlot, as: 'slots' }],
    });

    for (const reqSlot of slots) {
      for (const exBooking of existingBookings) {
        const exSlots = (exBooking as any).slots || [];
        for (const exSlot of exSlots) {
          if (isOverlapping(reqSlot.startTime, reqSlot.endTime, exSlot.startTime, exSlot.endTime)) {
            throw new BadRequestError(
              `Khung giờ ${reqSlot.startTime} - ${reqSlot.endTime} đã có người đặt trước.`
            );
          }
        }
      }
    }

    // 4. Tạo Booking
    // Giả định nếu thanh toán MoMo thì chuyển ngay thành CONFIRMED / PAID cho luồng phát triển thuận tiện
    const bookingStatus = 'CONFIRMED';
    const paymentStatus = paymentMethod === 'MOMO' ? 'PAID' : 'UNPAID';

    const booking = await Booking.create({
      courtId,
      userId,
      date,
      totalPrice,
      status: bookingStatus,
      paymentStatus,
      paymentMethod,
      couponCode,
    });

    // 5. Tạo các BookingSlots
    const createdSlots = await Promise.all(
      slots.map((slot) =>
        BookingSlot.create({
          bookingId: booking.id,
          startTime: slot.startTime,
          endTime: slot.endTime,
        })
      )
    );

    return {
      id: booking.id,
      courtId,
      courtName: court.name,
      venueName: venue.name,
      date: booking.date,
      totalPrice: booking.totalPrice,
      status: booking.status,
      paymentStatus: booking.paymentStatus,
      paymentMethod: booking.paymentMethod,
      slots: createdSlots.map((s) => ({
        startTime: s.startTime,
        endTime: s.endTime,
      })),
    };
  },

  // Danh sách đặt sân của tôi
  getMyBookings: async (
    userId: string,
    params: { page?: number; limit?: number; status?: string }
  ) => {
    const page = params.page || 1;
    const limit = params.limit || 10;
    const offset = (page - 1) * limit;

    const whereClause: any = { userId };
    if (params.status) {
      whereClause.status = params.status;
    }

    const { rows: bookings, count } = await Booking.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Court,
          as: 'court',
          include: [{ model: Venue, as: 'venue' }],
        },
        {
          model: BookingSlot,
          as: 'slots',
        },
      ],
      order: [['created_at', 'DESC']],
      limit,
      offset,
    });

    const mapped = bookings.map((b: any) => {
      const court = b.court || {};
      const venue = court.venue || {};
      const slots = b.slots || [];

      return {
        id: b.id,
        courtId: b.courtId,
        courtName: court.name || 'Sân đã xoá',
        venueName: venue.name || 'Địa điểm đã xoá',
        date: b.date,
        totalPrice: b.totalPrice,
        status: b.status,
        paymentStatus: b.paymentStatus,
        paymentMethod: b.paymentMethod,
        slots: slots.map((s: any) => ({
          startTime: s.startTime,
          endTime: s.endTime,
        })),
      };
    });

    return {
      bookings: mapped,
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
    };
  },

  // Chi tiết booking
  getDetails: async (userId: string, bookingId: string) => {
    const booking = await Booking.findByPk(bookingId, {
      include: [
        {
          model: Court,
          as: 'court',
          include: [{ model: Venue, as: 'venue' }],
        },
        {
          model: BookingSlot,
          as: 'slots',
        },
      ],
    });

    if (!booking) {
      throw new NotFoundError('Không tìm thấy giao dịch đặt sân.');
    }

    // Bảo mật: Admin hoặc chính chủ sở hữu booking mới được xem
    // (Trong phạm vi đồ án, chúng ta check chủ sở hữu là chính user)
    if (booking.userId !== userId) {
      throw new BadRequestError('Bạn không có quyền truy cập thông tin đặt sân này.');
    }

    const court = (booking as any).court || {};
    const venue = court.venue || {};
    const slots = (booking as any).slots || [];

    return {
      id: booking.id,
      courtId: booking.courtId,
      courtName: court.name,
      venueName: venue.name,
      date: booking.date,
      totalPrice: booking.totalPrice,
      status: booking.status,
      paymentStatus: booking.paymentStatus,
      paymentMethod: booking.paymentMethod,
      cancelReason: booking.cancelReason,
      slots: slots.map((s: any) => ({
        startTime: s.startTime,
        endTime: s.endTime,
      })),
    };
  },

  // Huỷ đặt sân
  cancel: async (userId: string, bookingId: string, reason?: string) => {
    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
      throw new NotFoundError('Không tìm thấy giao dịch đặt sân.');
    }

    if (booking.userId !== userId) {
      throw new BadRequestError('Bạn không có quyền huỷ giao dịch đặt sân này.');
    }

    if (booking.status === 'CANCELLED') {
      throw new BadRequestError('Giao dịch đặt sân đã được huỷ trước đó.');
    }

    booking.status = 'CANCELLED';
    booking.cancelReason = reason || 'Huỷ bởi khách hàng';
    if (booking.paymentStatus === 'PAID') {
      booking.paymentStatus = 'REFUNDED';
    }
    await booking.save();

    return {
      id: booking.id,
      status: booking.status,
      paymentStatus: booking.paymentStatus,
    };
  },
};
