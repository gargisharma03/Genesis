import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

import {
  USER_ROLES,
  USER_STATUS,
  AUTH_PROVIDERS,
} from "../constants.js";

import { generateAvatarColor } from "../utils/generateAvatarColors.js";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 30,
      match: [
        /^[a-z0-9_]+$/,
        "Username can only contain lowercase letters, numbers and underscores",
      ],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, "Invalid email address"],
    },

    password: {
      type: String,
      required: function () {
        return this.authProvider === "local";
      },
      minlength: 8,
      select: false,
    },

    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: 100,
    },

    avatar: {
      type: String,
      default: "",
    },

    avatarPublicId: {
      type: String,
      default: "",
    },

    avatarColor: {
      type: String,
      default: generateAvatarColor,
    },

    bio: {
      type: String,
      trim: true,
      maxlength: 300,
      default: "",
    },

    organization: {
      type: String,
      trim: true,
      default: "",
    },

    researchInterests: [
      {
        type: String,
        trim: true,
      },
    ],

    role: {
      type: String,
      enum: USER_ROLES,
      default: "user",
    },

    status: {
      type: String,
      enum: USER_STATUS,
      default: "active",
    },

    authProvider: {
      type: String,
      enum: AUTH_PROVIDERS,
      default: "local",
    },

    providerId: {
      type: String,
      default: null,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    lastWorkspace: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      default: null,
    },

    lastSeen: {
      type: Date,
      default: Date.now,
    },

    refreshTokenVersion: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

userSchema.index({ lastWorkspace: 1 });


userSchema.virtual("initials").get(function () {
  if (!this.name) return "";

  return this.name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .substring(0, 3)
    .toUpperCase();
});


userSchema.pre(/^find/, function () {
  this.where({
    status: {
      $ne: "deleted",
    },
  });

  
});



userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);

});



userSchema.methods.comparePassword = async function (enteredPassword) {
  if (!this.password) {
    throw new Error("Password hash not loaded.");
  }

  return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.methods.getPublicProfile = function () {
  return {
    id: this._id,
    username: this.username,
    name: this.name,
    avatar: this.avatar,
    avatarColor: this.avatarColor,
    initials: this.initials,
    bio: this.bio,
    organization: this.organization,
  };
};

const User = mongoose.model("User", userSchema);

export default User;