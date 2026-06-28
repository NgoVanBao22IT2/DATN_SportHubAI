import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../../../config/database';
import Booking from './Booking';

interface BookingSlotAttributes {
  id: string;
  bookingId: string;
  startTime: string;
  endTime: string;
}

interface BookingSlotCreationAttributes extends Optional<BookingSlotAttributes, 'id'> {}

class BookingSlot extends Model<BookingSlotAttributes, BookingSlotCreationAttributes> {
  declare id: string;
  declare bookingId: string;
  declare startTime: string;
  declare endTime: string;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
}

BookingSlot.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    bookingId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'bookings', key: 'id' },
      onDelete: 'CASCADE',
    },
    startTime: { type: DataTypes.STRING(5), allowNull: false },
    endTime: { type: DataTypes.STRING(5), allowNull: false },
  },
  {
    sequelize,
    tableName: 'booking_slots',
  }
);

BookingSlot.belongsTo(Booking, { foreignKey: 'bookingId', as: 'booking' });
Booking.hasMany(BookingSlot, { foreignKey: 'bookingId', as: 'slots' });

export default BookingSlot;
