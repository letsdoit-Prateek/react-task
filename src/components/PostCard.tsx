import React from 'react';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white font-semibold text-lg">
            {post.id}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold capitalize text-gray-900 mb-2">
            {post.title}
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            Post ID: {post.id} | User ID: {post.userId}
          </p>
          
          <div className="space-y-2">
            <div className="text-sm text-gray-700">
              <p className="leading-relaxed">
                {post.body}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;