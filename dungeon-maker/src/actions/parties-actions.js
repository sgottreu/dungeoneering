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

export function updatePartyName(name) {
  return {
    type: types.UPDATE_PARTY_NAME,
    name: name
  };
}

export function updatePartyMember(member, index) {
  return {
    type: types.UPDATE_PARTY_MEMBER,
    member: member,
    index: index
  };
}