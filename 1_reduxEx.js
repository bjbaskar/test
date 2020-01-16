import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'
import App from './components/App'
const store = createStore(rootReducer)
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

*-*-*-*-*-

let nextTodoId = 0
export const addTodo = text => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})
export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})
export const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id
})
export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

-*-*--*-*-

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      )
    default:
      return state
  }
}
export default todos

*-*-*-*-*-

import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
export default combineReducers({
  todos,
  visibilityFilter
})

-*-*-*-*-

import React, { useEffect } from "react";
import { Icon, IconButton, Tooltip } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import ReactTable from "react-table";
import moment from "moment";
import { useLazyQuery } from "react-apollo";

import { FuseUtils } from "@fuse";
import { SubjectActions as Actions, gqlQueries } from "../store/actions";

function SubjectTable() {
	const dispatch = useDispatch();
	const searchText = useSelector(({ subject }) => subject.subjects.searchText);
	const subjDialog = useSelector(({ subject }) => subject.subjects.subjDialog);

	const [getSubjects, { called, loading, error, data }] = useLazyQuery(
		gqlQueries.querySubjects
	);

	useEffect(() => {
		if (!called || !subjDialog.props.open) {
			getSubjects();
		}
	}, [subjDialog.props.open]);

	const getFilteredArray = (data, searchText) => {
		// const arr = Object.keys(data).map(id => data[id]);
		if (searchText.length === 0) {
			return data;
		}
		return FuseUtils.filterArrayByString(data, searchText);
	};

	if (error) return <h1>Error...</h1>;
	if ((called && loading) || !data) return <h1>Loading...</h1>;

	const objData = getFilteredArray(data.subjects, searchText.trim());

	return (
		<ReactTable
			className={"-striped -highlight border-0 min-w-xl "}
			data={objData}
			showPagination={true}
			defaultSorted={[
				{
					id: "name",
					asc: true
				}
			]}
			columns={[
				{
					Header: "Subject Name",
					accessor: "name",
					getProps: () => {
						return {
							style: {
								paddingLeft: "32px"
							}
						};
					}
				},
				{
					id: "subcode",
					Header: "Subject Code",
					accessor: "subcode",
					Cell: row => (
						<div
							className={classNames("inline p-4 rounded truncate")}
							style={{
								backgroundColor: row.original.color,
								minWidth: "42px"
							}}
						>
							{row.original.subcode}
						</div>
					)
				},
				{
					id: "updatedby",
					Header: "Last Updated by",
					accessor: row => {
						return row.updatedby ? row.updatedby : row.createdby;
					},
					Cell: row => (
						<div>
							{row.original.updatedby
								? row.original.updatedby
								: row.original.createdby}
						</div>
					)
				},
				{
					id: "updatedon",
					Header: "Last Updated on",
					accessor: row => {
						return row.updatedon ? row.updatedon : row.createdon;
					},
					Cell: row => (
						<div className="pl-8">
							{row.original.updatedon
								? moment(row.original.updatedon).format(
										"MMM Do YYYY, h:mm a"
								  )
								: moment(row.original.createdon).format(
										"MMM Do YYYY, h:mm a"
								  )}
						</div>
					)
				},
				{
					Header: "",
					sortable: false,
					Cell: row => (
						<div className="flex items-center">
							<Tooltip title="Edit Subject">
								<IconButton
									onClick={ev => {
										ev.stopPropagation();
										dispatch(
											Actions.openEditDialog(row.original, "edit")
										);
									}}
								>
									<Icon>edit</Icon>
								</IconButton>
							</Tooltip>
							<Tooltip title="Delete / Inactivate">
								<IconButton
									onClick={ev => {
										ev.stopPropagation();
										dispatch(
											Actions.openEditDialog(row.original, "delete")
										);
									}}
								>
									<Icon>delete</Icon>
								</IconButton>
							</Tooltip>
						</div>
					)
				}
			]}
		/>
	);
}

export default SubjectTable;

