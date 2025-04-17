import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MEDIA, PROFILE } from "@/utils/types";
import { Heart, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";

const InstagramMediaCard = ({ item }: { item: MEDIA; profile: PROFILE }) => {
  return (
    <Card>
      <CardContent>
        <img
          src={item.media_url}
          alt="Post"
          className="mb-2 h-auto w-full rounded-lg"
        />
        <p>{item.caption}</p>
        <div className="flex justify-evenly">
          <div className="flex flex-col items-center justify-center gap-2">
            <Heart size={24} />
            <p>{item.like_count} likes</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <MessageCircle size={24} />
            <p>{item.comments_count} comments</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View Comments
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InstagramMediaCard;
