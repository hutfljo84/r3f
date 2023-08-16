import { render } from '@testing-library/react';

import Globus from './Globus';

describe('Globus', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Globus />);
        expect(baseElement).toBeTruthy();
    });
});
