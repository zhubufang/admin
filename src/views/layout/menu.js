export default {
    logo: 'UNI-ADMIN',
    navBar: {
        active: '0',
        list: [{
                name: "首页",
                subActive: '0',
                icon: 'icon-shouye',
                submenu: [{
                        icon: "el-icon-s-home",
                        name: "后台首页",
                        pathname: "index"
                    },

                ]
            }, 
            {
                name: "设置",
                icon: 'icon-shezhi',
                submenu: [{

                        name: "管理员设置",
                        pathname: "set_manager"
                    },
                    {

                        name: "角色设置",
                        pathname: "set_role"
                    },
                    {

                        name: "权限设置",
                        pathname: "set_authority"
                    }
                ]
            }
        ]
    }
}