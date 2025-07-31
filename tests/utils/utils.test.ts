import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';

describe('Utils', () => {
    describe('cn (className utility)', () => {
        it('combines multiple class names', () => {
            const result = cn('class1', 'class2', 'class3');
            expect(result).toContain('class1');
            expect(result).toContain('class2');
            expect(result).toContain('class3');
        });

        it('handles conditional classes', () => {
            const result = cn('base', true && 'conditional', false && 'hidden');
            expect(result).toContain('base');
            expect(result).toContain('conditional');
            expect(result).not.toContain('hidden');
        });

        it('handles undefined and null values', () => {
            const result = cn('base', undefined, null, 'valid');
            expect(result).toContain('base');
            expect(result).toContain('valid');
        });

        it('handles duplicate classes gracefully', () => {
            const result = cn('duplicate', 'other', 'duplicate');
            expect(result).toContain('duplicate');
            expect(result).toContain('other');
            // Note: cn utility may not deduplicate classes, which is normal behavior
        });
    });
});
