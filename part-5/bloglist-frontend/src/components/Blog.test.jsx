import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Blog from './Blog';

// Mock the update function from services/blogs to avoid real network calls
vi.mock('../services/blogs', () => ({
  update: vi.fn((id, updatedBlog) => Promise.resolve({ ...updatedBlog, id })),
}));

import { update } from '../services/blogs';

describe('Blog component', () => {
  const sampleBlog = {
    id: '123',
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://example.com',
    likes: 5,
    user: {
      username: 'tester',
      name: 'Test User',
      id: 'user123'
    }
  };

  const mockOnLike = vi.fn();
  const mockOnDelete = vi.fn();

  beforeEach(() => {
    mockOnLike.mockClear();
    mockOnDelete.mockClear();
    update.mockClear();
  });

  it('renders title and author but not url or likes by default', () => {
    render(<Blog blog={sampleBlog} onLike={mockOnLike} onDelete={mockOnDelete} user={sampleBlog.user} />);
    expect(screen.getByText(/Test Blog Title/)).toBeDefined();
    expect(screen.getByText(/Test Author/)).toBeDefined();
    expect(screen.queryByText(/http:\/\/example.com/)).toBeNull();
    expect(screen.queryByText(/5 likes/)).toBeNull();
  });

  it('shows url and likes when the view button is clicked', () => {
    render(<Blog blog={sampleBlog} onLike={mockOnLike} onDelete={mockOnDelete} user={sampleBlog.user} />);
    fireEvent.click(screen.getByText('view'));
    expect(screen.getByText((content) => content.includes('http://example.com'))).toBeDefined();
    expect(screen.getByText((content) => content.includes('5 likes'))).toBeDefined();
  });

  it('calls onLike twice when like button is clicked twice', async () => {
    render(<Blog blog={sampleBlog} onLike={mockOnLike} onDelete={mockOnDelete} user={sampleBlog.user} />);
    fireEvent.click(screen.getByText('view'));

    const likeButton = screen.getByText('like');

    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    // Since handleLike is async, you might want to wait for the calls to finish:
    // This ensures promises are resolved before assertion
    await new Promise(process.nextTick);

    expect(mockOnLike).toHaveBeenCalledTimes(2);
  });
});
