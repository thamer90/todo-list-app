import React from 'react';
import { mount } from 'enzyme';
import App from './App';

describe('App', () => {
  let Component;
  
    beforeEach(() => {
        Component = mount(
          <App />
        );
    });

    it('should render the App component', () => {
      expect(Component.length).toBeTruthy();
    });

    it('should display correct number and value of listed items', () => {
      expect(Component.instance().state.items.length).toBe(3);
      expect(Component.find('.striped .item').length).toBe(3);
      expect(Component.find('.striped .item').at(0).text()).toContain('Scale Mount Everest');
      expect(Component.find('.striped .item').at(1).text()).toContain('Pick up dry-cleaning');
      expect(Component.find('.striped .item').at(2).text()).toContain('Take a Shower');
    });

    it('should add an item to the list when a task is entered', () => {
      Component.find('#task-item').simulate('change', { target: { value: 'Go to the gym' } });
      Component.find('#add-task').simulate('click');
      expect(Component.instance().state.items.length).toBe(4);
      expect(Component.find('.striped .item').at(3).text()).toContain('Go to the gym');
    });

    it('should remove the correct item from the list when a task is deleted', () => {
      Component.find('.striped .item').at(0).find('#delete-item').simulate('click');
      expect(Component.instance().state.items.length).toBe(2);
      expect(Component.find('.striped .item').length).toBe(2);
      expect(Component.instance().state.items[0].value).toBe('Pick up dry-cleaning');
      expect(Component.instance().state.items[1].value).toBe('Take a Shower');
      expect(Component.find('.striped .item').at(0).text()).toContain('Pick up dry-cleaning');
      expect(Component.find('.striped .item').at(1).text()).toContain('Take a Shower');
    });

    it('should tell the user that there are no items when all tasks have been deleted', () => {
      Component.find('.striped .item').at(2).find('#delete-item').simulate('click');
      Component.find('.striped .item').at(1).find('#delete-item').simulate('click');
      Component.find('.striped .item').at(0).find('#delete-item').simulate('click');
      expect(Component.instance().state.items.length).toBe(0);
      expect(Component.find('.striped .item').length).toBe(0);
      expect(Component.find('.no-items').length).toBe(1);
    });

    it('should set the state of the item to completed when the completed button for that item is clicked', () => {
      Component.find('.striped .item').at(0).find('#set-complete').simulate('click');
      expect(Component.instance().state.items[0].completed).toBe(true);
    });

    it('should set the state of the item to pending when the pending button for that item is clicked', () => {
      Component.find('.striped .item').at(2).find('#set-pending').simulate('click');
      expect(Component.instance().state.items[2].completed).toBe(false);
    });

    it('should sort the items alphabetically when the sort by name button is clicked', () => {
      Component.find('#sort-by-name').simulate('click');
      expect(Component.instance().state.items[0].value).toBe('Pick up dry-cleaning');
      expect(Component.instance().state.items[1].value).toBe('Scale Mount Everest');
      expect(Component.instance().state.items[2].value).toBe('Take a Shower');
      expect(Component.find('.striped .item').at(0).text()).toContain('Pick up dry-cleaning');
      expect(Component.find('.striped .item').at(1).text()).toContain('Scale Mount Everest');
      expect(Component.find('.striped .item').at(2).text()).toContain('Take a Shower');
    });

    it('should sort the items by priority when the sort by priority button is clicked', () => {
      Component.find('#sort-by-priority').simulate('click');
      expect(Component.instance().state.items[0].value).toBe('Scale Mount Everest');
      expect(Component.instance().state.items[1].value).toBe('Take a Shower');
      expect(Component.instance().state.items[2].value).toBe('Pick up dry-cleaning');
      expect(Component.find('.striped .item').at(0).text()).toContain('Scale Mount Everest');
      expect(Component.find('.striped .item').at(1).text()).toContain('Take a Shower');
      expect(Component.find('.striped .item').at(2).text()).toContain('Pick up dry-cleaning');
    });

    it('should display the correct number of tasks and completed tasks', () => {
      expect(Component.find('.summary-section p').at(0).text()).toBe('Number of Tasks: 3');
      expect(Component.find('.summary-section p').at(1).text()).toBe('Completed Tasks: 1');
    });

    it('should display the correct number of completed tasks when tasks are updated', () => {
      Component.find('.striped .item').at(0).find('#set-complete').simulate('click');
      expect(Component.instance().state.items[0].completed).toBe(true);
      expect(Component.find('.summary-section p').at(0).text()).toBe('Number of Tasks: 3');
      expect(Component.find('.summary-section p').at(1).text()).toBe('Completed Tasks: 2');
    });

    it('should display the correct number of tasks when tasks are updated', () => {
      Component.find('#task-item').simulate('change', { target: { value: 'Go to the gym' } });
      Component.find('#add-task').simulate('click');
      expect(Component.find('.summary-section p').at(0).text()).toBe('Number of Tasks: 4');
      expect(Component.find('.summary-section p').at(1).text()).toBe('Completed Tasks: 1');
    });

    it('should update the priority of an item when the priority option is changed', () => {
      Component.find('.striped .item').at(0).find('#priority-select').prop('onChange')({target: { value: 'Low' }});
      expect(Component.instance().state.items[0].priority).toBe('Low');      
    });
});
