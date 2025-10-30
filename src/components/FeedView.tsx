import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface Post {
  id: number;
  author: string;
  avatar: string;
  time: string;
  content: string;
  upvotes: number;
  downvotes: number;
  comments: number;
  shares: number;
  userVote: "up" | "down" | null;
}

interface FeedViewProps {
  posts: Post[];
  onBack: () => void;
  onVote: (postId: number, voteType: "up" | "down") => void;
}

const FeedView = ({ posts, onBack, onVote }: FeedViewProps) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white">
              <Icon name="ArrowLeft" size={24} />
            </Button>
            <h2 className="text-2xl font-light text-white">Лента новостей</h2>
          </div>
          <Button variant="ghost" size="icon" className="text-white">
            <Icon name="Plus" size={24} />
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-6 space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="bg-card border-border p-6 flex gap-4">
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={() => onVote(post.id, "up")}
                className={`transition-colors ${
                  post.userVote === "up" ? "text-[hsl(var(--metro-orange))]" : "text-muted-foreground hover:text-[hsl(var(--metro-orange))]"
                }`}
              >
                <Icon name="ChevronUp" size={24} />
              </button>
              <span className="text-white font-medium">{post.upvotes - post.downvotes}</span>
              <button
                onClick={() => onVote(post.id, "down")}
                className={`transition-colors ${
                  post.userVote === "down" ? "text-[hsl(var(--metro-blue))]" : "text-muted-foreground hover:text-[hsl(var(--metro-blue))]"
                }`}
              >
                <Icon name="ChevronDown" size={24} />
              </button>
            </div>

            <div className="flex-1">
              <div className="flex items-start gap-4 mb-4">
                <Avatar className="h-12 w-12 bg-primary">
                  <div className="flex items-center justify-center w-full h-full text-white font-semibold text-sm">
                    {post.avatar}
                  </div>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-medium text-white">{post.author}</h3>
                  <p className="text-sm text-muted-foreground">{post.time}</p>
                </div>
              </div>
              <p className="text-foreground mb-4">{post.content}</p>
              <div className="flex items-center gap-6 text-muted-foreground">
                <button className="flex items-center gap-2 hover:text-[hsl(var(--metro-blue))] transition-colors">
                  <Icon name="MessageCircle" size={20} />
                  <span>{post.comments}</span>
                </button>
                <button className="flex items-center gap-2 hover:text-[hsl(var(--metro-green))] transition-colors">
                  <Icon name="Share2" size={20} />
                  <span>{post.shares}</span>
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeedView;
