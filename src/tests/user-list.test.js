import {UserList} from "../components/profile/user-list";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import * as services from "./services";
import axios from "axios";

//jest.mock('axios');

const MOCKED_USERS = [
  {username: 'ellen_ripley', password: 'lv426', email: 'repley@weyland.com', _id: "123"},
  {username: 'sarah_conor', password: 'illbeback', email: 'sarah@bigjeff.com', _id: "234"},
]

describe('render from static', () =>{
  test('user list renders static user array', () => {
  render(
    <HashRouter>
      <UserList users={MOCKED_USERS}/>
    </HashRouter>);
  let linkElement = screen.getByText(/ellen_ripley/i);
  expect(linkElement).toBeInTheDocument();
  linkElement = screen.getByText(/sarah_conor/i);
  expect(linkElement).toBeInTheDocument();
});
});

describe('render from async', () => {
  const andraUser = {
    username: 'andra',
    password: 'nour',
    email: 'andra@hotmail.com'
  };
  beforeAll(() => {
    return services.createUser(andraUser);
  });

  afterAll(() => {
    return services.deleteUsersByUsername(andraUser.username);
  });
  test('user list renders async', async () => {
  const users = await services.findAllUsers();
  render(
    <HashRouter>
      <UserList users={users}/>
    </HashRouter>);
    const linkElement = screen.getByText(/andra/i);
    expect(linkElement).toBeInTheDocument();
  });
});

describe('render from mock', () => {
  const MOCKED_USERS = [
    {username: 'ellen_ripley', password: 'lv426', email: 'repley@weyland.com', _id: "123"},
    {username: 'sarah_conor', password: 'illbeback', email: 'sarah@bigjeff.com', _id: "234"},
  ];

  test('user list renders mocked', async () => {
    const mock = jest.spyOn(axios, 'get');
    mock.mockImplementation(() =>
        Promise.resolve({data: {users: MOCKED_USERS}}));

    const response = await services.findAllUsers();
    const users = response.users;
    mock.mockRestore();

    render(
        <HashRouter>
          <UserList users={users}/>
        </HashRouter>);

    const user = screen.getByText(/ellen_ripley/i);
    expect(user).toBeInTheDocument();
  });
});
