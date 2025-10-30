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

const FeedView = ({ posts, onBack }: FeedViewProps) => {
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
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-6">
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <Icon name="Newspaper" size={64} className="mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground text-lg">Лента пуста</p>
            <p className="text-muted-foreground text-sm mt-2">Постов пока нет</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id} className="bg-card border-border p-6">
                <p className="text-foreground">{post.content}</p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedView;