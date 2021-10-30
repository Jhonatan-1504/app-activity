import { Icon, INavLink, INavLinkGroup, Stack } from "@fluentui/react";
import { Link, useHistory } from "react-router-dom";
import { Colors } from "../theme/Theme";

const NavColor = () => {
  const navLinkGroups: INavLinkGroup[] = [
    {
      links: [
        {
          name: "Actividades",
          url: "/",
          icon: "EntitlementPolicy",
          key: "key4",
        },
        {
          name: "Configuraciones",
          url: "/config",
          key: "key3",
          icon: "Settings",
        },
        {
          name: "Mis Avances",
          url: "/list",
          icon: "CheckList",
          key: "key5",
        },
      ],
    },
  ];

  const history = useHistory();

  const onRenderLink = (nav?: INavLink) => {
    return (
      <Link
        key={nav?.key}
        to={nav?.url ? nav.url : "/"}
        style={{ textDecoration: "none", color: Colors.palette.black }}
      >
        <Stack
          horizontal
          tokens={{ childrenGap: 10, padding: 15 }}
          styles={{
            root: {
              borderRadius: 5,
              background:
                history.location.pathname === nav?.url
                  ? Colors.palette.neutralLight
                  : "trasparent",
              selectors: {
                "&:hover": {
                  background: Colors.palette.neutralQuaternaryAlt,
                },
                "&:active": {
                  background: Colors.palette.neutralQuaternaryAlt,
                },
              },
            },
          }}
        >
          <Icon iconName={nav?.icon} />
          <div>{nav?.name}</div>
        </Stack>
      </Link>
    );
  };

  return (
    <Stack verticalAlign="center" tokens={{ padding: "10px 0" }}>
      {navLinkGroups[0].links.map((nav) => onRenderLink(nav))}
    </Stack>
  );
};

export default NavColor;
