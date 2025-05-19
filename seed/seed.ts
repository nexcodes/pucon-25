import {
  PrismaClient,
  Role,
  CommunityNiche,
  InviteStatus,
} from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

// Helper function to create a random date within the last year
const randomDateLastYear = (): Date => {
  const now = new Date();
  const oneYearAgo = new Date(
    now.getFullYear() - 1,
    now.getMonth(),
    now.getDate()
  );
  return faker.date.between({ from: oneYearAgo, to: now });
};

// Helper function to get random element from array
const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

// Carbon-saving activities by niche
const carbonSavingActivities: Record<CommunityNiche, string[]> = {
  SUSTAINABLE_TRANSPORT: [
    "Biked to work instead of driving for a week",
    "Carpooled with colleagues for a month",
    "Used public transportation for all commutes this month",
    "Maintained proper tire pressure to improve fuel efficiency",
    "Switched to an electric vehicle",
  ],
  RENEWABLE_ENERGY: [
    "Installed solar panels",
    "Switched to a renewable energy provider",
    "Used energy-efficient appliances",
    "Implemented a home battery storage system",
    "Conducted a home energy audit and made improvements",
  ],
  ZERO_WASTE: [
    "Composted all food waste for a month",
    "Used only reusable shopping bags",
    "Eliminated single-use plastics from household",
    "Started a community recycling program",
    "Repaired items instead of replacing them",
  ],
  ECO_FRIENDLY_DIET: [
    "Went vegetarian for a month",
    "Reduced beef consumption by 50%",
    "Purchased only local produce for a season",
    "Started a community garden",
    "Reduced food waste through better meal planning",
  ],
  GREEN_TECH: [
    "Implemented smart home energy management",
    "Switched to energy-efficient lighting throughout home",
    "Used power management settings on all devices",
    "Installed a programmable thermostat",
    "Upgraded to ENERGY STAR appliances",
  ],
  SUSTAINABLE_FASHION: [
    "Bought only secondhand clothing for six months",
    "Repaired and maintained existing wardrobe",
    "Organized a clothing swap event",
    "Supported eco-friendly clothing brands",
    "Donated unused clothing to charity",
  ],
  URBAN_GARDENING: [
    "Started a balcony garden",
    "Created a community composting system",
    "Planted native species in yard",
    "Converted lawn to a vegetable garden",
    "Implemented rainwater harvesting system",
  ],
};

// Carbon savings by activity type (in tons)
const getCarbonSavingsForActivity = (activity: string): number => {
  // Simplified model - in reality this would be more sophisticated
  const smallSavings = faker.number.float({ min: 0.05, max: 0.5 });
  const mediumSavings = faker.number.float({ min: 0.5, max: 2 });
  const largeSavings = faker.number.float({ min: 2, max: 5 });

  if (activity.includes("solar") || activity.includes("electric vehicle")) {
    return largeSavings;
  } else if (activity.includes("month") || activity.includes("vegetarian")) {
    return mediumSavings;
  } else {
    return smallSavings;
  }
};

// Community goal templates by niche
const communityGoalTemplates: Record<
  CommunityNiche,
  { title: string; description: string; targetValue: number }[]
> = {
  SUSTAINABLE_TRANSPORT: [
    {
      title: "Reduce Community Commute Emissions",
      description:
        "Collectively reduce our commuting emissions through carpooling, biking, and public transit",
      targetValue: 50,
    },
    {
      title: "EV Adoption Drive",
      description: "Help community members transition to electric vehicles",
      targetValue: 100,
    },
  ],
  RENEWABLE_ENERGY: [
    {
      title: "Neighborhood Solar Initiative",
      description: "Increase solar panel adoption in our neighborhood",
      targetValue: 200,
    },
    {
      title: "Community Battery Storage",
      description: "Implement shared battery storage for renewable energy",
      targetValue: 150,
    },
  ],
  ZERO_WASTE: [
    {
      title: "Zero Waste Challenge",
      description:
        "Reduce household waste to nearly zero through recycling and composting",
      targetValue: 30,
    },
    {
      title: "Plastic-Free Community",
      description: "Eliminate single-use plastics from our community",
      targetValue: 25,
    },
  ],
  ECO_FRIENDLY_DIET: [
    {
      title: "Meatless Monday Initiative",
      description:
        "Reduce meat consumption community-wide through Meatless Mondays",
      targetValue: 40,
    },
    {
      title: "Local Food Movement",
      description: "Source more of our food from local producers",
      targetValue: 35,
    },
  ],
  GREEN_TECH: [
    {
      title: "Smart Home Energy Savings",
      description: "Implement smart home technology to reduce energy usage",
      targetValue: 75,
    },
    {
      title: "E-Waste Reduction Program",
      description: "Properly recycle and reduce electronic waste",
      targetValue: 15,
    },
  ],
  SUSTAINABLE_FASHION: [
    {
      title: "Fast Fashion Detox",
      description:
        "Reduce fast fashion purchases and focus on sustainable clothing",
      targetValue: 20,
    },
    {
      title: "Community Clothing Exchange",
      description: "Establish regular clothing swap events",
      targetValue: 10,
    },
  ],
  URBAN_GARDENING: [
    {
      title: "Community Garden Expansion",
      description: "Expand our community garden to more locations",
      targetValue: 25,
    },
    {
      title: "Native Plant Initiative",
      description: "Replace non-native plants with native species",
      targetValue: 15,
    },
  ],
};

// Personal goal templates
const personalGoalTemplates = [
  {
    title: "Reduce My Carbon Footprint",
    description: "Track and reduce my personal carbon emissions",
    targetValue: 10,
  },
  {
    title: "Zero-Waste Kitchen",
    description: "Transform my kitchen into a zero-waste zone",
    targetValue: 5,
  },
  {
    title: "Car-Free Commuting",
    description: "Commute without using a personal car",
    targetValue: 7,
  },
  {
    title: "Energy Efficient Home",
    description: "Implement energy efficiency measures throughout my home",
    targetValue: 15,
  },
  {
    title: "Sustainable Diet",
    description: "Shift to a more plant-based, locally-sourced diet",
    targetValue: 8,
  },
];

// Content templates for activity posts
const activityPostTemplates = [
  "Just completed my {activity} and saved {amount} tons of CO2! #ClimateAction",
  "Excited to share that our community reached {amount}% of our {goal} goal today!",
  "Looking for participants in our upcoming {activity} challenge. Who's in?",
  "Tip of the day: {activity} can save up to {amount} tons of CO2 annually.",
  "Celebrated a milestone today! Our community has collectively saved {amount} tons of carbon since we started.",
  "Inspired by {member}'s commitment to {activity}. Keep up the great work!",
  "Just joined the {community} community! Excited to work toward our shared sustainability goals.",
  "Found this great resource for {activity}. Link in comments!",
  "Before and after pictures of my {activity} project. So satisfying!",
  "Struggling with {activity}. Any advice from community members who have done this?",
];

// Main seed function
async function seed() {
  console.log("Starting database seed...");

  try {
    // Create users (25 users)
    const users = [];
    for (let i = 0; i < 25; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const createdAt = randomDateLastYear();

      const user = await prisma.user.create({
        data: {
          name: `${firstName} ${lastName}`,
          email: faker.internet.email({ firstName, lastName }),
          emailVerified: true,
          image: faker.image.avatar(),
          createdAt,
          updatedAt: createdAt,
        },
      });
      users.push(user);

      // Create account for auth
      await prisma.account.create({
        data: {
          id: faker.string.uuid(),
          accountId: faker.string.uuid(),
          providerId: "credentials",
          userId: user.id,
          password: "hashed_password_here", // In a real app, this would be properly hashed
          createdAt: createdAt,
          updatedAt: createdAt,
        },
      });

      // Create personal goals for each user (1-3 goals per user)
      const numPersonalGoals = faker.number.int({ min: 1, max: 3 });
      for (let j = 0; j < numPersonalGoals; j++) {
        const goalTemplate = getRandomElement(personalGoalTemplates);
        const personalGoal = await prisma.personalGoal.create({
          data: {
            userId: user.id,
            title: goalTemplate.title,
            description: goalTemplate.description,
            targetValue: goalTemplate.targetValue,
            progress: faker.number.float({
              min: 0,
              max: goalTemplate.targetValue,
              precision: 0.1,
            }),
            createdAt: createdAt,
            updatedAt: createdAt,
          },
        });

        // Create personal activity logs for this goal (0-5 logs)
        const numActivities = faker.number.int({ min: 0, max: 5 });
        for (let k = 0; k < numActivities; k++) {
          const activityDate = faker.date.between({
            from: createdAt,
            to: new Date(),
          });
          const description = getRandomElement(
            Object.values(carbonSavingActivities).flat()
          );
          const carbonSaved = getCarbonSavingsForActivity(description);

          await prisma.personalActivityLog.create({
            data: {
              userId: user.id,
              goalId: personalGoal.id,
              description,
              carbonSaved,
              activityDate,
              createdAt: activityDate,
              updatedAt: activityDate,
            },
          });
        }
      }
    }

    console.log(
      `Created ${users.length} users with personal goals and activity logs`
    );

    // Create communities (7 communities, one for each niche)
    const communities = [];
    const niches = Object.values(CommunityNiche);

    for (let i = 0; i < niches.length; i++) {
      const niche = niches[i];
      const createdAt = randomDateLastYear();

      const community = await prisma.community.create({
        data: {
          name: `${niche
            .split("_")
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(" ")} Community`,
          description: `A community dedicated to ${niche
            .split("_")
            .map((word) => word.toLowerCase())
            .join(" ")} initiatives and projects.`,
          niche,
          createdAt,
          updatedAt: createdAt,
        },
      });
      communities.push(community);

      // Assign leader to the community (first member as leader)
      const leaderId = users[i % users.length].id;
      await prisma.communityMember.create({
        data: {
          userId: leaderId,
          communityId: community.id,
          role: Role.COMMUNITY_LEADER,
          joinedAt: createdAt,
          updatedAt: createdAt,
        },
      });

      // Add 5-15 members to each community
      const memberCount = faker.number.int({ min: 5, max: 15 });
      const memberIds = new Set([leaderId]);

      while (memberIds.size < memberCount + 1) {
        memberIds.add(
          users[faker.number.int({ min: 0, max: users.length - 1 })].id
        );
      }

      // Remove the leader as we've already added them
      memberIds.delete(leaderId);

      // Add other members
      for (const memberId of memberIds) {
        const joinedAt = faker.date.between({
          from: createdAt,
          to: new Date(),
        });
        await prisma.communityMember.create({
          data: {
            userId: memberId,
            communityId: community.id,
            role: Role.USER,
            joinedAt,
            updatedAt: joinedAt,
          },
        });
      }

      // Create community goals (1-3 goals per community)
      const goalTemplates = communityGoalTemplates[niche];
      const numGoals = Math.min(
        goalTemplates.length,
        faker.number.int({ min: 1, max: 3 })
      );

      for (let j = 0; j < numGoals; j++) {
        const goalTemplate = goalTemplates[j % goalTemplates.length];
        const goalCreatedAt = faker.date.between({
          from: createdAt,
          to: new Date(),
        });

        const goal = await prisma.communityGoal.create({
          data: {
            communityId: community.id,
            title: goalTemplate.title,
            description: goalTemplate.description,
            targetValue: goalTemplate.targetValue,
            progress: faker.number.float({
              min: 0,
              max: goalTemplate.targetValue,
              precision: 0.1,
            }),
            createdById: leaderId,
            createdAt: goalCreatedAt,
            updatedAt: goalCreatedAt,
          },
        });

        // Create activity logs for this goal from community members
        for (const memberId of [...memberIds, leaderId]) {
          const numActivities = faker.number.int({ min: 0, max: 3 });

          for (let k = 0; k < numActivities; k++) {
            const activityDate = faker.date.between({
              from: goalCreatedAt,
              to: new Date(),
            });
            const description = getRandomElement(carbonSavingActivities[niche]);
            const carbonSaved = getCarbonSavingsForActivity(description);

            await prisma.activityLog.create({
              data: {
                userId: memberId,
                communityId: community.id,
                goalId: goal.id,
                description,
                carbonSaved,
                activityDate,
                createdAt: activityDate,
                updatedAt: activityDate,
              },
            });
          }
        }
      }

      // Create activity posts for the community
      const postCount = faker.number.int({ min: 10, max: 30 });
      for (let j = 0; j < postCount; j++) {
        const postDate = faker.date.between({
          from: createdAt,
          to: new Date(),
        });
        const postUserId = getRandomElement([...memberIds, leaderId]);

        let postTemplate = getRandomElement(activityPostTemplates);
        postTemplate = postTemplate
          .replace(
            "{activity}",
            getRandomElement(carbonSavingActivities[niche])
          )
          .replace(
            "{amount}",
            faker.number.int({ min: 1, max: 100 }).toString()
          )
          .replace(
            "{goal}",
            getRandomElement(communityGoalTemplates[niche]).title
          )
          .replace(
            "{member}",
            users.find((u) => u.id === getRandomElement([...memberIds]))
              ?.name || "a community member"
          )
          .replace("{community}", community.name);

        await prisma.activityPost.create({
          data: {
            userId: postUserId,
            communityId: community.id,
            content: postTemplate,
            createdAt: postDate,
            updatedAt: postDate,
          },
        });
      }

      // Create some pending invites (2-5 per community)
      const inviteCount = faker.number.int({ min: 2, max: 5 });
      const nonMemberUsers = users.filter(
        (u) => !memberIds.has(u.id) && u.id !== leaderId
      );

      for (let j = 0; j < inviteCount && j < nonMemberUsers.length; j++) {
        const inviteDate = faker.date.between({
          from: createdAt,
          to: new Date(),
        });

        await prisma.communityInvite.create({
          data: {
            communityId: community.id,
            userId: nonMemberUsers[j].id,
            status: InviteStatus.PENDING,
            message: `Would you like to join our ${community.name}?`,
            createdAt: inviteDate,
            updatedAt: inviteDate,
          },
        });
      }
    }

    console.log(
      `Created ${communities.length} communities with members, goals, activities, and posts`
    );
    console.log("Database seed completed successfully!");
  } catch (error) {
    console.error("Error during seeding:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed function
seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
