const UsersComponent = (props: any) => {
  const users: [{ users: [] }] = props?.users;
  console.log("*** Users:", users);
  return (
    <>
      {users.map((user: any) =>
        Object.keys(user).forEach(function (key, index) {
          console.log("*** key:", key, user[key]);
          <li>key user[key]</li>;
        })
      )}
    </>
  );
};
export default UsersComponent;
