// Copyright (c) The Diem Core Contributors
// SPDX-License-Identifier: Apache-2.0

Feature('account-creation-events-page')

function seeRowHeaders(I) {
  I.see('Transaction Version')
  I.see('Sent Events Key')
  I.see('Role')
  I.see('Received Mint Events Key')
  I.see('Received Events Key')
  I.see('Parent VASP Address')
  I.see('Is Frozen')
  I.see('Indexed At')
  I.see('Diem Id Domain Events Key')
  I.see('Expiration Time')
  I.see('Delegated Withdrawal Capability')
  I.see('Delegated Key Rotation Capability')
  I.see('Create Account Event Stream Sequence Number')
  I.see('Compliance Key')
  I.see('Address')
  I.see('Base Url')
  I.see('Base Url Rotation Events Key')
  I.see('Authentication Key')
  I.see('Human Name')
  I.see('Compliance Key Rotation Events Key')
}

function seeRowData(I) {
  I.see('303872513')
  I.see('04000...00df5')
  I.see('2')
  I.see('00000...00df5')
  I.see('03000...00df5')
  I.see('false')
  I.see('2021-10-08T18:28:18.099735+00:00')
  I.see('2099-01-01T00:00:00+00:00')
  I.see('true')
  I.see('null')
  I.see('35802')
  I.see('354459ddc069b1e00dc2068fce400df5')
  I.see('02000...00df5')
  I.see('e0ed1...00df5')
  I.see('pentest_pre_prod_des-dealer2')
  I.see('01000...00df5')
}

Scenario('navigating to account creation events from landing page', ({ I }) => {
  I.amOnPage('/')
  I.click('Events')
  I.navTo('Account Creation Events')
  I.seeInCurrentUrl('/events/accountcreation')

  I.see('Account Creation Events')
  seeRowHeaders(I)
  seeRowData(I)
  I.navigateToAddressPage('354459ddc069b1e00dc2068fce400df5')
})
