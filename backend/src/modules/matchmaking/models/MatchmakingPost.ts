import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../../../config/database';
import User from '../../auth/models/User';

interface MatchmakingPostAttributes {
  id: string;
  sportType: string;
  playDate: string;
  playTime: string;
  location: string;
  skillLevel: string;
  neededQuantity: number;
  totalQuantity: number;
  costPerPerson: number;
  notes?: string | null;
  userId: string;
}

interface MatchmakingPostCreationAttributes
  extends Optional<MatchmakingPostAttributes, 'id' | 'notes'> {}

class MatchmakingPost
  extends Model<MatchmakingPostAttributes, MatchmakingPostCreationAttributes>
  implements MatchmakingPostAttributes
{
  declare id: string;
  declare sportType: string;
  declare playDate: string;
  declare playTime: string;
  declare location: string;
  declare skillLevel: string;
  declare neededQuantity: number;
  declare totalQuantity: number;
  declare costPerPerson: number;
  declare notes: string | null;
  declare userId: string;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
}

MatchmakingPost.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    sportType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    playDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    playTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    skillLevel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    neededQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    costPerPerson: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      get() {
        const val = this.getDataValue('costPerPerson');
        return val ? Number(val) : 0;
      },
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    modelName: 'MatchmakingPost',
    tableName: 'matchmaking_posts',
  }
);

// Relationships
MatchmakingPost.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(MatchmakingPost, { foreignKey: 'userId', as: 'matchmakingPosts' });

export default MatchmakingPost;
