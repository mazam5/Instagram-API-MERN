import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { MEDIA, PROFILE } from "@/utils/types";
import axios from "axios";
import { Heart, MessageCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const InstagramMediaCard = ({ item }: { item: MEDIA; profile: PROFILE }) => {
  const [openComments, setOpenComments] = useState(false);
  const { VITE_SERVER_BASEURL } = import.meta.env;
  const [comments, setComments] = useState([]);
  useEffect(() => {
    fetchAllComments();
  }, [openComments]);
  const fetchAllComments = async () => {
    const response = await axios.get(`${VITE_SERVER_BASEURL}/api/comments`, {
      params: {
        media_id: item.id,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    const data = response.data;
    setComments(data);
    console.log(comments);
  };
  return (
    <Card>
      <Drawer>
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
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setOpenComments(true)}
            >
              View Comments
            </Button>
          </DrawerTrigger>
          <DrawerContent className="mx-auto h-screen w-3/4">
            <div className="fle">
              <DrawerHeader>
                <DrawerTitle>Comments</DrawerTitle>
                <DrawerDescription>
                  Here are the comments for this post.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerClose asChild>
                <Button
                  variant="outline"
                  className="absolute top-4 right-4"
                  onClick={() => setOpenComments(false)}
                >
                  <X size={24} />
                </Button>
              </DrawerClose>
            </div>
          </DrawerContent>
        </CardFooter>
      </Drawer>
    </Card>
  );
};

export default InstagramMediaCard;
