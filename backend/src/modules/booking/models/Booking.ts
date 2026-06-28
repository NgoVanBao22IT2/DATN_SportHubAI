import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../../../config/database';
import User from '../../auth/models/User';
import Court from '../../venue/models/Court';

interface BookingAttributes {
  id: string;
  courtId: string;
  userId: string;
  date: string;
  totalPrice: number;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  paymentStatus: 'UNPAID' | 'PAID' | 'REFUNDED';
  paymentMethod: 'MOMO' | 'CASH_AT_VENUE';
  couponCode?: string | null;
  cancelReason?: string | null;
}

interface BookingCreationAttributes extends Optional<BookingAttributes, 'id' | 'status' | 'paymentStatus' | 'couponCode' | 'cancelReason'> {}

class Booking extends Model<BookingAttributes, BookingCreationAttributes> {
  declare id: string;
  declare courtId: string;
  declare userId: string;
  declare date: string;
  declare totalPrice: number;
  declare status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  declare paymentStatus: 'UNPAID' | 'PAID' | 'REFUNDED';
  declare paymentMethod: 'MOMO' | 'CASH_AT_VENUE';
  declare couponCode: string | null;
  declare cancelReason: string | null;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
}

Booking.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    courtId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'courts', key: 'id' },
      onDelete: 'RESTRICT',
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'users', key: 'id' },
      onDelete: 'CASCADE',
    },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    totalPrice: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      get() {
        const val = this.getDataValue('totalPrice');
        return val !== null && val !== undefined ? parseFloat(String(val)) : 0;
      },
    },
    status: {
      type: DataTypes.ENUM('PENDING', 'CONFIRMED', 'CANCELLED'),
      allowNull: false,
      defaultValue: 'PENDING',
    },
    paymentStatus: {
      type: DataTypes.ENUM('UNPAID', 'PAID', 'REFUNDED'),
      allowNull: false,
      defaultValue: 'UNPAID',
    },
    paymentMethod: {
      type: DataTypes.ENUM('MOMO', 'CASH_AT_VENUE'),
      allowNull: false,
    },
    couponCode: { type: DataTypes.STRING, allowNull: true },
    cancelReason: { type: DataTypes.STRING, allowNull: true },
  },
  {
    sequelize,
    tableName: 'bookings',
  }
);

Booking.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Booking, { foreignKey: 'userId', as: 'bookings' });

Booking.belongsTo(Court, { foreignKey: 'courtId', as: 'court' });
Court.hasMany(Booking, { foreignKey: 'courtId', as: 'bookings' });

export default Booking;
