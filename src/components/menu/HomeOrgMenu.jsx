import { useOrg } from "../../context/OrganizationContext";

const HomeOrgMenu = () => {
  const { currentOrg, navigations } = useOrg();
  let items = [
    {
      lable: "Welcome",
      key: 1,
      icon: null,
    },
  ];
  console.log(navigations);
  return (
    <div className="bg-red-500 home-org-menu w-full h-full grid grid-cols-1 justify-center items-center">
      {currentOrg && <p>{currentOrg.name}</p>}

      {items &&
        items.map((item) => {
          return (
            <div
              key={item.key}
              className="bg-red-200 flex justify-start items-baseline px-3 m-3"
            >
              <p>{item.lable}</p>
              {item.icon}
            </div>
          );
        })}
    </div>
  );
};
export default HomeOrgMenu;
