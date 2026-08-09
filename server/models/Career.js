const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Career title is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Career category is required'],
      enum: [
        'Technology',
        'Medicine',
        'Commerce',
        'Law',
        'Design',
        'Agriculture',
        'Civil Services',
        'Defence',
        'Public Service',
        'Business & Marketing',
      ],
    },
    educationLevels: [
      {
        type: String,
      },
    ],
    icon: {
      type: String,
      default: '💼',
    },
    overview: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
      default: '₹5 - 20 LPA',
    },
    demand: {
      type: String,
      required: true,
      default: 'High Demand 🔥',
    },
    skills: [
      {
        type: String,
      },
    ],
    topCompanies: [
      {
        type: String,
      },
    ],
    requiredEducation: {
      type: String,
      required: true,
    },
    futureScope: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      default: '4-6 Years',
    },
    roadmapSteps: [
      {
        step: Number,
        title: String,
        description: String,
        subjects: [String],
        videos: [
          {
            title: String,
            url: String,
          },
        ],
        resources: [
          {
            title: String,
            url: String,
          },
        ],
        tips: [String],
        books: [String],
        status: {
          type: String,
          default: 'Upcoming',
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Career = mongoose.model('Career', careerSchema);

module.exports = Career;
