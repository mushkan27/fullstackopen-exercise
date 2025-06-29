import { render, screen, fireEvent } from '@testing-library/react';
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

    expect(screen.getByText(/Test Blog Title/)).toBeDefined();
    expect(screen.getByText(/Test Author/)).toBeDefined();

    expect(screen.queryByText(/http:\/\/example.com/)).toBeNull();
    expect(screen.queryByText(/5 likes/)).toBeNull();
  });

  it('shows url and likes when the view button is clicked', async () => {
    render(<Blog blog={sampleBlog} onLike={mockOnLike} onDelete={mockOnDelete} user={sampleBlog.user} />);

    const viewButton = screen.getByText('view');
    fireEvent.click(viewButton);

    // Use more flexible matchers
    expect(screen.getByText((content) => content.includes('http://example.com'))).toBeDefined();
    expect(screen.getByText((content) => content.includes('5 likes'))).toBeDefined();
  });
});
