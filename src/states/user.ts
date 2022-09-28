import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { UserInfo } from '@/types';

const { persistAtom } = recoilPersist({
  key: 'recoil-persist',
  storage: typeof window === 'undefined' ? undefined : sessionStorage,
});

export const userState = atom<UserInfo | null>({
  key: 'userState',
  default: null,
  effects_UNSTABLE: [persistAtom],
});
