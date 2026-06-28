import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../../../config/database';
import Venue from './Venue';

interface CourtAttributes {
  id: string;
  venueId: string;
  name: string;
  sportType: 'PICKLEBALL' | 'BADMINTON' | 'TENNIS';
  pricePerHour: number;
  status: 'ACTIVE' | 'MAINTENANCE';
}

interface CourtCreationAttributes extends Optional<CourtAttributes, 'id' | 'status'> {}

class Court extends Model<CourtAttributes, CourtCreationAttributes> {
  declare id: string;
  declare venueId: string;
  declare name: string;
  declare sportType: 'PICKLEBALL' | 'BADMINTON' | 'TENNIS';
  declare pricePerHour: number;
  declare status: 'ACTIVE' | 'MAINTENANCE';
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
}

Court.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    venueId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'venues', key: 'id' },
      onDelete: 'CASCADE',
    },
    name: { type: DataTypes.STRING, allowNull: false },
    sportType: {
      type: DataTypes.ENUM('PICKLEBALL', 'BADMINTON', 'TENNIS'),
      allowNull: false,
    },
    pricePerHour: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      get() {
        const val = this.getDataValue('pricePerHour');
        return val !== null && val !== undefined ? parseFloat(String(val)) : 0;
      },
    },
    status: {
      type: DataTypes.ENUM('ACTIVE', 'MAINTENANCE'),
      allowNull: false,
      defaultValue: 'ACTIVE',
    },
  },
  {
    sequelize,
    tableName: 'courts',
  }
);

Court.belongsTo(Venue, { foreignKey: 'venueId', as: 'venue' });
Venue.hasMany(Court, { foreignKey: 'venueId', as: 'courts' });

export default Court;
