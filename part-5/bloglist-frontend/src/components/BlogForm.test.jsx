import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import BlogForm from './BlogForm';

describe('BlogForm component', () => {
    const mockCreateBlog = vi.fn();

    beforeEach(() => {
        mockCreateBlog.mockClear();
    });

    it('calls createBlog with correct details when form is submitted', () => {
        render(<BlogForm createBlog={mockCreateBlog} />);

        const titleInput = screen.getByLabelText(/title/i);
        const authorInput = screen.getByLabelText(/author/i);
        const urlInput = screen.getByLabelText(/url/i);
        const submitButton = screen.getByText(/create/i);

        fireEvent.change(titleInput, { target: { value: 'My New Blog' } });
        fireEvent.change(authorInput, { target: { value: 'John Doe' } });
        fireEvent.change(urlInput, { target: { value: 'http://example.com' } });

        fireEvent.click(submitButton);

        expect(mockCreateBlog).toHaveBeenCalledTimes(1);
        expect(mockCreateBlog).toHaveBeenCalledWith({
            title: 'My New Blog',
            author: 'John Doe',
            url: 'http://example.com',
        });
    });
});
