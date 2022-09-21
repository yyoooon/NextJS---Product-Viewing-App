import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { UserInfoType } from '@/types';

const { persistAtom } = recoilPersist({
  key: 'recoil-persist',
  storage: typeof window === 'undefined' ? undefined : sessionStorage,
});

export const userState = atom<UserInfoType | null>({
  key: 'userState',
  default: null,
  effects_UNSTABLE: [persistAtom],
});
