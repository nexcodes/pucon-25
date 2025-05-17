import React from "react";
import { useGetAIInsight } from "../_api/use-get-ai-insight";

export default function AiInsight({ communityId }: { communityId: string }) {
  const { data, isLoading } = useGetAIInsight(communityId);

  if (isLoading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center space-x-2 mb-4">
          <div className="h-5 w-5 rounded-full bg-emerald-500 animate-pulse"></div>
          <h2 className="text-xl font-semibold text-gray-800">AI Insights</h2>
        </div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6"></div>

          <div className="mt-6">
            <div className="h-5 bg-gray-200 rounded animate-pulse w-1/3 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-11/12"></div>
          </div>

          <div className="mt-6">
            <div className="h-5 bg-gray-200 rounded animate-pulse w-1/3 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!data || !data.aiInsights) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center space-x-2 mb-4">
          <div className="h-5 w-5 rounded-full bg-emerald-500"></div>
          <h2 className="text-xl font-semibold text-gray-800">AI Insights</h2>
        </div>
        <p className="text-gray-600">
          No insights available for this community yet.
        </p>
      </div>
    );
  }

  // Parse the markdown content to extract sections
  const sections = data.aiInsights.split(/\*\*[\d]+\.\s+/).filter(Boolean);
  const title = sections[0].split("##")[1]?.trim() || "Analysis";

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center space-x-2 mb-4">
        <div className="h-5 w-5 rounded-full bg-emerald-500"></div>
        <h2 className="text-xl font-semibold text-gray-800">AI Insights</h2>
      </div>

      <h3 className="text-lg font-medium text-gray-700 mb-4">{title}</h3>

      <div className="space-y-6">
        {sections.slice(1).map((section, index) => {
          const [sectionTitle, ...content] = section.split(":**");
          return (
            <div key={index} className="border-l-4 border-emerald-500 pl-4">
              <h4 className="font-semibold text-gray-800 mb-2">
                {sectionTitle}
              </h4>
              <div className="text-gray-600 text-sm space-y-2">
                {content
                  .join(":**")
                  .split("\n\n")
                  .map((paragraph, i) => {
                    // Handle bullet points
                    if (paragraph.includes("* **")) {
                      const bulletPoints = paragraph
                        .split("* **")
                        .filter(Boolean);
                      return (
                        <ul
                          key={i}
                          className="list-disc list-inside space-y-2 ml-2"
                        >
                          {bulletPoints.map((point, j) => (
                            <li key={j} className="text-gray-600">
                              <span className="font-medium">
                                {point.split(":**")[0]}
                              </span>
                              {point.includes(":**")
                                ? `: ${point.split(":**")[1]}`
                                : point}
                            </li>
                          ))}
                        </ul>
                      );
                    }

                    return <p key={i}>{paragraph.replace(/\*\*/g, "")}</p>;
                  })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div>
            Community:{" "}
            <span className="font-medium">{data.data.communityName}</span>
          </div>
          <div className="flex space-x-4">
            <div>
              Members:{" "}
              <span className="font-medium">{data.data.memberCount}</span>
            </div>
            <div>
              Carbon Saved:{" "}
              <span className="font-medium">
                {data.data.totalCarbonSaved} tons
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
