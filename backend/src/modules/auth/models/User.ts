import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../../../config/database';
import bcrypt from 'bcryptjs';

interface UserAttributes {
  id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  password: string;
  role: 'USER' | 'OWNER' | 'ADMIN';
  avatarUrl?: string | null;
  isVerified: boolean;
  verificationCode?: string | null;
  verificationExpires?: Date | null;
  resetPasswordCode?: string | null;
  resetPasswordExpires?: Date | null;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'avatarUrl' | 'verificationCode' | 'verificationExpires' | 'resetPasswordCode' | 'resetPasswordExpires'> {}

class User extends Model<UserAttributes, UserCreationAttributes> {
  declare id: string;
  declare email: string;
  declare fullName: string;
  declare phoneNumber: string;
  declare password: string;
  declare role: 'USER' | 'OWNER' | 'ADMIN';
  declare avatarUrl: string | null;
  declare isVerified: boolean;
  declare verificationCode: string | null;
  declare verificationExpires: Date | null;
  declare resetPasswordCode: string | null;
  declare resetPasswordExpires: Date | null;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;

  // Instance method: Kiểm tra mật khẩu
  async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('USER', 'OWNER', 'ADMIN'),
      allowNull: false,
      defaultValue: 'USER',
    },
    avatarUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    verificationCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    verificationExpires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    resetPasswordCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetPasswordExpires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'users',
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

export default User;
