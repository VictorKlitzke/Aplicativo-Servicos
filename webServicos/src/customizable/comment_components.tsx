import React, { useState, ChangeEvent, FormEvent } from 'react';
import { CommentComponentsProps } from '../interface';

const CommentComponents: React.FC<CommentComponentsProps> = ({
    placeholder = "Escreva seu comentário...",
    maxLength = 200,
    onSubmit,
    comments
}) => {
    const [comment, setComment] = useState<string>('');

    const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
    };

    const handleCommentSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (comment.trim() !== '') {
            if (onSubmit) onSubmit(comment);
            setComment('');
        }
    };

    return (
        <div className="comment-container p-4 rounded border shadow-sm bg-white">
            <form onSubmit={handleCommentSubmit}>
                <div className="mb-3">
                    <textarea
                        value={comment}
                        onChange={handleCommentChange}
                        placeholder={placeholder}
                        maxLength={maxLength}
                        rows={4}
                        className="form-control"
                        style={{ resize: 'none' }}
                    />
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <button type="submit" className="btn btn-primary">Enviar</button>
                    <span className="text-muted">{comment.length}/{maxLength}</span>
                </div>
            </form>

            {comments.length > 0 ? (
                <div className="comments-list mt-4">
                    <h5>Comentários:</h5>
                    <ul className="list-unstyled">
                        {comments.map((item, index) => (
                            <li key={index} className="mb-3 p-3 border rounded shadow-sm d-flex align-items-start bg-light">
                                
                                <div>
                                    <strong>{item.user}</strong>
                                    <p className="mb-1">{item.comment}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="mt-4">
                    <p className="text-muted">Ainda não há comentários.</p>
                </div>
            )}
        </div>
    );
};

export default CommentComponents;
