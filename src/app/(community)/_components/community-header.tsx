import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

interface CommunityHeaderProps {
  community: {
    name: string;
    description: string;
    niche: string;
    memberCount?: number;
  };
}

export function CommunityHeader({ community }: CommunityHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
      <Avatar className="w-24 h-24 border-4 border-green-500">
        <AvatarImage
          src={`https://avatar.vercel.sh/${community.name}`}
          alt={community.name}
        />
        <AvatarFallback className="text-2xl bg-green-100 text-green-700">
          {community.name.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">{community.name}</h1>
          <Badge className="bg-green-500 hover:bg-green-600">
            {community.niche}
          </Badge>
        </div>
        <p className="text-gray-600 max-w-2xl">{community.description}</p>
        <div className="flex items-center text-sm text-gray-500">
          <Users className="h-4 w-4 mr-1" />
          <span>{community.memberCount || 0} members</span>
        </div>
      </div>
    </div>
  );
}
