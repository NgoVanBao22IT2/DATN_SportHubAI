import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../../../config/database';
import User from './User';

interface RefreshTokenAttributes {
  id: string;
  token: string;
  userId: string;
  expiresAt: Date;
}

interface RefreshTokenCreationAttributes extends Optional<RefreshTokenAttributes, 'id'> {}

class RefreshToken extends Model<RefreshTokenAttributes, RefreshTokenCreationAttributes> {
  declare id: string;
  declare token: string;
  declare userId: string;
  declare expiresAt: Date;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;

  get isExpired(): boolean {
    return new Date() > this.expiresAt;
  }
}

RefreshToken.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    token: {
      type: DataTypes.STRING(500),
      allowNull: false,
      unique: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'users', key: 'id' },
      onDelete: 'CASCADE',
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'refresh_tokens',
  }
);

// Quan hệ
RefreshToken.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(RefreshToken, { foreignKey: 'userId', as: 'refreshTokens' });

export default RefreshToken;
