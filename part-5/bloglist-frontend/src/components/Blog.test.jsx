import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Blog from './Blog';

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

  it('renders title and author but not url or likes by default', () => {
    render(<Blog blog={sampleBlog} onLike={mockOnLike} onDelete={mockOnDelete} user={sampleBlog.user} />);

    // Title and author should be visible
    expect(screen.getByText(/Test Blog Title/)).toBeDefined();
    expect(screen.getByText(/Test Author/)).toBeDefined();

    // URL and likes should not be in the DOM initially
    expect(screen.queryByText(/http:\/\/example.com/)).toBeNull();
    expect(screen.queryByText(/5 likes/)).toBeNull();
  });
});
