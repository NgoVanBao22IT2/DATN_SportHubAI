import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../../../config/database';
import User from '../../auth/models/User';

interface VenueAttributes {
  id: string;
  name: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  sportTypes: string[];
  rating: number;
  reviewsCount: number;
  imageUrls: string[];
  ownerId: string;
}

interface VenueCreationAttributes extends Optional<VenueAttributes, 'id' | 'rating' | 'reviewsCount'> {}

class Venue extends Model<VenueAttributes, VenueCreationAttributes> {
  declare id: string;
  declare name: string;
  declare description: string;
  declare address: string;
  declare latitude: number;
  declare longitude: number;
  declare sportTypes: string[];
  declare rating: number;
  declare reviewsCount: number;
  declare imageUrls: string[];
  declare ownerId: string;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
}

Venue.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    latitude: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: false,
      get() {
        const val = this.getDataValue('latitude');
        return val !== null && val !== undefined ? parseFloat(String(val)) : 0;
      },
    },
    longitude: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: false,
      get() {
        const val = this.getDataValue('longitude');
        return val !== null && val !== undefined ? parseFloat(String(val)) : 0;
      },
    },
    sportTypes: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
    rating: {
      type: DataTypes.DECIMAL(2, 1),
      allowNull: false,
      defaultValue: 5.0,
      get() {
        const val = this.getDataValue('rating');
        return val !== null && val !== undefined ? parseFloat(String(val)) : 5.0;
      },
    },
    reviewsCount: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    imageUrls: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
    ownerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'users', key: 'id' },
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    tableName: 'venues',
  }
);

Venue.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });
User.hasMany(Venue, { foreignKey: 'ownerId', as: 'venues' });

export default Venue;
