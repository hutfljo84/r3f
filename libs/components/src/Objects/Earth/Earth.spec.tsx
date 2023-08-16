import { render } from '@testing-library/react';

import Earth from './Earth';

describe('Earth', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Earth />);
        expect(baseElement).toBeTruthy();
    });
});
