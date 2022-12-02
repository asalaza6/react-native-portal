import React, { memo, useEffect } from 'react';
import { usePortalState } from '../../hooks/usePortalState';
import { usePortal } from '../../hooks/usePortal';
import type { PortalHostProps } from './types';

const PortalHostComponent = ({ name, disableUnmount }: PortalHostProps & { disableUnmount?: boolean }) => {
  //#region hooks
  const state = usePortalState(name);
  const { registerHost, deregisterHost } = usePortal(name);
  //#endregion

  //#region effects
  useEffect(() => {
    registerHost();
    return () => {
      if (!disableUnmount) deregisterHost();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //#endregion

  //#region render
  return <>{state.map(item => item.node)}</>;
  //#endregion
};

export const PortalHost = memo(PortalHostComponent);
PortalHost.displayName = 'PortalHost';
