import { CommunityNiche } from "@prisma/client";

// Helper function to get niche display information
export function getNicheInfo(niche: string) {
  const nicheMap: Record<
    string,
    { label: string; color: string; icon: string }
  > = {
    [CommunityNiche.SUSTAINABLE_TRANSPORT]: {
      label: "Sustainable Transport",
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      icon: "bike",
    },
    [CommunityNiche.RENEWABLE_ENERGY]: {
      label: "Renewable Energy",
      color:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
      icon: "sun",
    },
    [CommunityNiche.ZERO_WASTE]: {
      label: "Zero Waste",
      color:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      icon: "recycle",
    },
    [CommunityNiche.ECO_FRIENDLY_DIET]: {
      label: "Eco-Friendly Diet",
      color:
        "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
      icon: "salad",
    },
    [CommunityNiche.GREEN_TECH]: {
      label: "Green Technology",
      color: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400",
      icon: "cpu",
    },
    [CommunityNiche.SUSTAINABLE_FASHION]: {
      label: "Sustainable Fashion",
      color: "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400",
      icon: "shirt",
    },
    [CommunityNiche.URBAN_GARDENING]: {
      label: "Urban Gardening",
      color: "bg-lime-100 text-lime-800 dark:bg-lime-900/30 dark:text-lime-400",
      icon: "flower",
    },
  };

  return (
    nicheMap[niche] || {
      label: "Other",
      color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
      icon: "help-circle",
    }
  );
}
