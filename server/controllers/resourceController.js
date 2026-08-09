const mongoose = require('mongoose');
const Resource = require('../models/Resource');

// Seed dataset covering Books, Courses, YouTube, Websites, Tools
const initialResourcesData = [
  {
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    type: 'Books',
    category: 'Software Engineering',
    description: 'A classic handbook detailing principles, practices, and refactoring techniques for writing clean, readable code.',
    link: 'https://amazon.com',
    authorOrPlatform: 'Robert C. Martin (Uncle Bob)',
    isFree: false,
    rating: 4.9,
    tags: ['Clean Code', 'Best Practices', 'Software Development'],
  },
  {
    title: 'Cracking the Coding Interview',
    type: 'Books',
    category: 'Interview Prep',
    description: '189 programming questions and solutions to crack top tech company coding interviews.',
    link: 'https://amazon.com',
    authorOrPlatform: 'Gayle Laakmann McDowell',
    isFree: false,
    rating: 4.8,
    tags: ['Interview Prep', 'Algorithms', 'Data Structures'],
  },
  {
    title: 'CS50: Introduction to Computer Science',
    type: 'Courses',
    category: 'Computer Science',
    description: 'Harvard University’s famous entry-level course on computer science and programming fundamentals.',
    link: 'https://edx.org/course/cs50s-introduction-to-computer-science',
    authorOrPlatform: 'Harvard University / edX',
    isFree: true,
    rating: 5.0,
    tags: ['CS Fundamentals', 'C', 'Python', 'Web Dev'],
  },
  {
    title: 'Full Stack Open 2024',
    type: 'Courses',
    category: 'Web Development',
    description: 'Deep dive into modern web development with React, Redux, Node.js, Express, and MongoDB.',
    link: 'https://fullstackopen.com/en/',
    authorOrPlatform: 'University of Helsinki',
    isFree: true,
    rating: 4.9,
    tags: ['React', 'Node.js', 'Full Stack', 'MERN'],
  },
  {
    title: 'FreeCodeCamp YouTube Channel',
    type: 'YouTube',
    category: 'Programming & Tech',
    description: 'Thousands of free, full-length video courses on web development, Python, AI, data science, and DevOps.',
    link: 'https://youtube.com/@freecodecamp',
    authorOrPlatform: 'freeCodeCamp.org',
    isFree: true,
    rating: 4.9,
    tags: ['Video Tutorials', 'Free Courses', 'Coding'],
  },
  {
    title: 'Traversy Media Full Stack Crash Courses',
    type: 'YouTube',
    category: 'Web Development',
    description: 'Practical, project-based video crash courses covering frontend frameworks, backend APIs, and design.',
    link: 'https://youtube.com/@TraversyMedia',
    authorOrPlatform: 'Brad Traversy',
    isFree: true,
    rating: 4.8,
    tags: ['React', 'Node.js', 'Project Based'],
  },
  {
    title: 'MDN Web Docs',
    type: 'Websites',
    category: 'Documentation',
    description: 'The authoritative, gold-standard documentation for HTML, CSS, JavaScript, and Web APIs.',
    link: 'https://developer.mozilla.org',
    authorOrPlatform: 'Mozilla Foundation',
    isFree: true,
    rating: 5.0,
    tags: ['Documentation', 'HTML/CSS', 'JavaScript'],
  },
  {
    title: 'LeetCode Problem Solving Portal',
    type: 'Websites',
    category: 'Algorithms & Coding',
    description: 'The premier platform for practicing data structures and algorithm problems for technical interviews.',
    link: 'https://leetcode.com',
    authorOrPlatform: 'LeetCode Team',
    isFree: true,
    rating: 4.7,
    tags: ['DSA', 'Problem Solving', 'Interview Prep'],
  },
  {
    title: 'Figma Collaborative Interface Design Tool',
    type: 'Tools',
    category: 'UI/UX Design',
    description: 'Industry standard browser-based design and prototyping tool for digital products.',
    link: 'https://figma.com',
    authorOrPlatform: 'Figma Inc.',
    isFree: true,
    rating: 4.9,
    tags: ['Design', 'UI/UX', 'Wireframing', 'Prototyping'],
  },
  {
    title: 'Postman API Testing Tool',
    type: 'Tools',
    category: 'API Development',
    description: 'Comprehensive API platform for building, testing, documenting, and sharing REST & GraphQL APIs.',
    link: 'https://postman.com',
    authorOrPlatform: 'Postman Inc.',
    isFree: true,
    rating: 4.8,
    tags: ['APIs', 'Testing', 'Backend', 'Development'],
  },
];

// Helper to seed database if empty
const autoSeedResources = async () => {
  try {
    if (mongoose.connection.readyState !== 1) return;
    const count = await Resource.countDocuments();
    if (count === 0) {
      await Resource.insertMany(initialResourcesData);
      console.log('Successfully seeded MongoDB with curated learning resources! 📚');
    }
  } catch (err) {
    console.error('Error auto-seeding resources collection:', err.message);
  }
};

/**
 * @desc    Get all resources with filtering & search
 * @route   GET /api/resources
 * @access  Public
 */
const getResources = async (req, res) => {
  try {
    const { type, category, search } = req.query;
    let resources = [];
    let fetchedFromDB = false;

    if (mongoose.connection.readyState === 1) {
      try {
        await autoSeedResources();
        const query = {};

        if (type && type !== 'All') {
          query.type = type;
        }

        if (category && category !== 'All') {
          query.category = { $regex: new RegExp(`^${category}$`, 'i') };
        }

        if (search) {
          query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { authorOrPlatform: { $regex: search, $options: 'i' } },
            { tags: { $in: [new RegExp(search, 'i')] } },
          ];
        }

        resources = await Resource.find(query).sort({ createdAt: -1 });
        fetchedFromDB = true;
      } catch (dbErr) {
        console.warn('MongoDB query warning, using fallback resource dataset:', dbErr.message);
      }
    }

    if (!fetchedFromDB) {
      resources = [...initialResourcesData];
      if (type && type !== 'All') {
        resources = resources.filter((r) => r.type === type);
      }
      if (category && category !== 'All') {
        resources = resources.filter((r) => r.category.toLowerCase() === category.toLowerCase());
      }
      if (search) {
        const s = search.toLowerCase();
        resources = resources.filter(
          (r) => r.title.toLowerCase().includes(s) || r.description.toLowerCase().includes(s)
        );
      }
    }

    return res.status(200).json({
      success: true,
      count: resources.length,
      resources,
    });
  } catch (error) {
    console.error('Get Resources Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error retrieving resource records.',
    });
  }
};

/**
 * @desc    Get single resource by ID
 * @route   GET /api/resources/:id
 * @access  Public
 */
const getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource item not found.',
      });
    }

    return res.status(200).json({
      success: true,
      resource,
    });
  } catch (error) {
    console.error('Get Resource Details Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error retrieving resource item.',
    });
  }
};

module.exports = {
  getResources,
  getResourceById,
};
