export const adminMenu = [
    //Hệ thống
    {
        name: 'menu.system.header', menus: [
            {
                name: 'menu.system.manage-all-codes',
                link: '/system/manage-all-codes'
            },
            {
                name: 'menu.system.manage-category.title',
                subMenus: [
                    {
                        name: 'menu.system.manage-category.main-category',
                        link: '/system/manage-category'
                    },
                    {
                        name: 'menu.system.manage-category.sub-category',
                        link: '/system/manage-sub-category'
                    },
                    {
                        name: 'menu.system.manage-category.child-category',
                        link: '/system/manage-child-category'
                    },
                ]

            },
            {
                name: 'menu.system.manage-product',
                link: '/system/manage-product'
            },




            // {
            //     name: 'menu.system.system-administrator.header',
            // subMenus: [
            //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
            //     { name: 'menu.system.system-administrator.product-manage', link: '/system/product-manage' },
            //     { name: 'menu.system.system-administrator.register-package-group-or-account', link: '/system/register-package-group-or-account' },
            // ]
            // },
            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
        ]
    },


];