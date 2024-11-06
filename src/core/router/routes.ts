import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '',
    component: () => import('src/core/layout/public/PublicLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/modules/login/views/LoginView.vue'),
        name: 'login',
        meta: {
          roles: ['UNSECURE'],
          tags: {
            set: false,
            title: 'Cineminha - KronusBoss',
          },
        },
      },
      {
        path: '/password/change/:key',
        name: 'ChangePassword',
        component: () => import('src/modules/change-password/views/ChangePasswordView.vue'),
        meta: {
          roles: ['UNSECURE'],
          tags: {
            set: true,
            title: 'Cineminha - Alterar Senha',
          },
        },
      },
      {
        path: '/login',
        redirect: () => {
          return { name: 'login' };
        },
        meta: {
          roles: ['UNSECURE'],
        },
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'notFound',
        component: () => import('src/modules/not-found/views/NotFoundView.vue'),
        meta: {
          roles: ['UNSECURE'],
          tags: {
            set: true,
            title: 'Cineminha - Página não encontrada',
          },
        },
      },
    ],
  },
  {
    path: '',
    component: () => import('src/core/layout/app-with-nav/AppLayout.vue'),
    children: [
      {
        path: '/home',
        component: () => import('src/modules/movie-home/views/MovieHomeView.vue'),
        name: 'home',
        meta: {
          roles: ['ADM', 'USER'],
          tags: {
            set: true,
            title: 'Cineminha - Home',
          },
        },
      },
      {
        path: '/adm',
        component: () => import('src/modules/administrator/views/AdministratorView.vue'),
        name: 'adm',
        meta: {
          roles: ['ADM'],
          tags: {
            set: true,
            title: 'Cineminha - ADM',
          },
        },
      },
      {
        path: '/movie/:id',
        component: () => import('src/components/movie/MoviePage.vue'),
        name: 'movie',
        meta: {
          roles: ['ADM', 'USER'],
          tags: {
            set: false,
          },
        },
      },
      {
        path: '/movie/add',
        component: () => import('src/components/movie/MoviePage.vue'),
        name: 'add',
        meta: {
          roles: ['ADM', 'USER'],
          tags: {
            set: true,
            title: 'Cineminha - Cadastrar Filme',
          },
        },
      },
      {
        path: '/profile',
        component: () => import('src/modules/profile/views/ProfileView.vue'),
        name: 'profile',
        meta: {
          roles: ['ADM', 'USER'],
          tags: {
            set: true,
            title: 'Cineminha - Perfil',
          },
        },
      },
      {
        path: '/movie/discover',
        component: () => import('src/components/discoverMovies/DiscoverMoviesPage.vue'),
        name: 'discoverMovies',
        meta: {
          roles: ['ADM', 'USER'],
          tags: {
            set: true,
            title: 'Cineminha - Descobrir',
          },
        },
      },
      {
        path: '/movie/watchlist',
        component: () => import('src/modules/movie-watchlist/views/MovieWatchlistsListView.vue'),
        name: 'movie-watchlist-list',
        meta: {
          roles: ['ADM', 'USER'],
          tags: {
            set: true,
            title: 'Cineminha - Lista de Filmes',
          },
        },
      },
      {
        path: '/movie/watchlist/:id',
        component: () => import('src/modules/movie-watchlist/views/MovieWatchlistView.vue'),
        name: 'movie-watchlist-id',
        meta: {
          roles: ['ADM', 'USER'],
          tags: {
            set: false,
          },
        },
      },
      {
        path: '/movie/dashboard',
        component: () => import('src/modules/movie-charts/views/MovieChartsView.vue'),
        name: 'movieCharts',
        meta: {
          roles: ['ADM', 'USER'],
          tags: {
            set: true,
            title: 'Cineminha - Dashboard',
          },
        },
      },
    ],
  },
];

export default routes;
