import {firebaseClient} from '@/clients/firebase'

export default function () {
  return {
    firebaseUser: firebaseClient.firebaseUser,
    user: firebaseClient.user
  }
}
