import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let editExpense;
let removeExpense;
let wrapper;
let history;

beforeEach(() => {
  editExpense = jest.fn();
  removeExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(<EditExpensePage
                      expense={expenses[2]}
                      editExpense={editExpense}
                      removeExpense={removeExpense}
                      history={history}
                    />);
});

test('should render EditExpensePage', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle editExpense', () => {
  const update = {
    ...expenses[2],
    note: 'test note',
  };
  wrapper.find('ExpenseForm').prop('onSubmit')(update);
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(editExpense).toHaveBeenLastCalledWith(update.id, update);
});

test('should handle removeExpense', () => {
  const id = expenses[2].id;
  wrapper.find('button').simulate('click');
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(removeExpense).toHaveBeenLastCalledWith({ id });
});
