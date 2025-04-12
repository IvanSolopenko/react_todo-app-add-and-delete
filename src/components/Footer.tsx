import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { FilterType } from '../types/FilterType';

type Props = {
  todos: Todo[];
  removeAllTodos: () => void;
  filter: FilterType;
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
};

const filterLabels: Record<FilterType, string> = {
  [FilterType.all]: 'All',
  [FilterType.active]: 'Active',
  [FilterType.completed]: 'Completed',
};

const hrefMap: Record<FilterType, string> = {
  [FilterType.all]: '#/',
  [FilterType.active]: '#/active',
  [FilterType.completed]: '#/completed',
};

const dataCyMap: Record<FilterType, string> = {
  [FilterType.all]: 'FilterLinkAll',
  [FilterType.active]: 'FilterLinkActive',
  [FilterType.completed]: 'FilterLinkCompleted',
};

export const Footer: React.FC<Props> = ({
  todos,
  removeAllTodos,
  filter,
  setFilter,
}) => {
  const activeTodos = todos.filter(
    todo => !todo.completed && !todo.loading,
  ).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {Object.values(FilterType).map(value => (
          <a
            key={value}
            href={hrefMap[value]}
            className={classNames('filter__link', {
              selected: filter === value,
            })}
            data-cy={dataCyMap[value]}
            onClick={() => setFilter(value)}
          >
            {filterLabels[value]}
          </a>
        ))}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={removeAllTodos}
        disabled={!todos.some(todo => todo.completed && !todo.loading)}
      >
        Clear completed
      </button>
    </footer>
  );
};
