import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreatePollView from '../views/CreatePollView.vue'
import QaView from '../views/QaView.vue'
import EditPollView from '../views/EditPollView.vue'
import PollResultsView from '../views/PollResultsView.vue'
import PollVote from '../views/PollVote.vue'
import PollDetailView from '../views/PollDetailView.vue'
import PollListView from '../views/PollListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/create',
      name: 'create',
      component: CreatePollView,
      meta: { hideLayout: true }
    },
    {
      path: '/qa',
      name: 'qa',
      component: QaView,
      meta: { hideLayout: true }
    },
    {
      path: '/edit',
      name: 'edit',
      component: EditPollView,
      meta: { hideLayout: true }
    },
    {
      path: '/edit/:code',
      name: 'edit-code',
      component: EditPollView,
      meta: { hideLayout: true }
    },
    {
      path: '/poll/:code',
      name: 'poll-vote',
      component: PollVote,
      meta: { hideLayout: true }
    },
    {
      path: '/results/:code',
      name: 'results-code',
      component: PollResultsView,
      meta: { hideLayout: true }
    },
    {
      path: '/detail/:code',
      name: 'poll-detail',
      component: PollDetailView,
      meta: { hideLayout: true }
    },
    {
      path: '/lists',
      name: 'poll-list',
      component: PollListView,
      meta: { hideLayout: true }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      redirect: '/'
    }
  ]
})

export default router
