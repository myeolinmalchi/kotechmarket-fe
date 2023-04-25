import * as jwt from 'jsonwebtoken';

const JWT_SECRET = '';

function* validateToken(token: string) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        yield decoded;
    } catch (error) {
        console.error('Invalid JWT token provided.');
        return null;
    }
}
