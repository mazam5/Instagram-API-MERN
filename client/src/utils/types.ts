export type PROFILE = {
  id: string;
  profile_picture_url: string;
  username: string;
  name: string;
  website: string;
  biography: string;
  follows_count: number;
  followers_count: number;
  media_count: number;
};

export type MEDIA = {
  id: string;
  caption: string;
  media_url: string;
  permalink: string;
  media_type: string;
  timestamp: string;
  username: string;
  like_count: number;
  comments: Array<string>;
  comments_count: number;
  thumbnail_url: string;
};
