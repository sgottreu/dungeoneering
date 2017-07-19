import * as types from '../actions/action-types';

export function loadAvailableParties(parties) {
  return {
    type: types.LOAD_AVAILABLE_PARTIES,
    parties: parties
  };
}

export function updateParty(party) {
  return {
    type: types.UPDATE_PARTY,
    party: party
  };
}

export function updatePartyMember(member) {
  return {
    type: types.UPDATE_PARTY_MEMBER,
    member: member
  };
}