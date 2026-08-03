import mongoose from "mongoose";
import slugify from "slugify";
import crypto from "crypto";



const workspaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Workspace name is required"],
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      default: "",
      maxlength: 500,
    },

    icon: {
      type: String,
      default: "📚",
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,

    },

    members: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },

        role: {
          type: String,
          enum: ["owner", "editor", "viewer"],
          default: "viewer",
        },

        

        joinedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    coverImage: {
        type: String,
        default: "",
    },

    coverImagePublicId: {
        type: String,
        default: "",
    },
    
    researchDomain: {
        type: String,
        default: "",
    },

    lastActivityAt: {
      type: Date,
      default: Date.now,
    },

    isArchived: {
      type: Boolean,
      default: false,
    },

    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    inviteCode: {
        type: String,
        unique: true,
        index: true,
    },


  },
  {
    timestamps: true,
  }
);

workspaceSchema.pre("validate", async function () {

    if (!this.slug && this.name) {
        this.slug = slugify(this.name, {
            lower: true,
            strict: true,
        });
    }

    if (!this.inviteCode) {
        this.inviteCode = crypto
            .randomBytes(4)
            .toString("hex")
            .toUpperCase();
    }

});

workspaceSchema.index({
  owner: 1,
  updatedAt: -1,
});

workspaceSchema.index({
  name: "text",
  description: "text",
});



export default mongoose.model("Workspace", workspaceSchema);