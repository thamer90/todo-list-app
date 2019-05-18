import React from 'react';
import { shallow } from 'enzyme';

import Item from './../../Item';

describe('Item', () => {
    let props;
    let Component = null;

    beforeEach(() => {
        props = {
            value: 'Save a life',
            priority: 'High',
            completed: false,
            updateStatus: jest.fn(),
            updatePriority: jest.fn(),
            deleteItem: jest.fn(),
        };

        Component = shallow(
            <Item index={0} {...props} />
        );
    });

    it('should render the Item component', () => {
        expect(Component.length).toBeTruthy();
    });

    it('should render the complete button and call the updateStatus event when the complete button is clicked', () => {
        expect(Component.find('#set-complete').length).toBe(1);
        Component.find('#set-complete').simulate('click');
        expect(props.updateStatus).toBeCalled();
    });

    it('should call the deleteItem event when the complete button is clicked', () => {
        Component.find('#delete-item').simulate('click');
        expect(props.deleteItem).toBeCalled();
    });

    it('should call the updatePriority event when the priority of an item is changed', () => {
        Component.find('#priority-select').prop('onChange')({ value: ['Low' ] });
        expect(props.updatePriority).toBeCalled();      
    });
});