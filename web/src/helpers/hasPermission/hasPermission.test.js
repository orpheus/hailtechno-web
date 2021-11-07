import cases from 'jest-in-case'
// eslint-disable-next-line camelcase
import hasPermission, { isParentPermission, hasPermission__deprecated } from './hasPermission'

describe('permission helpers', () => {
  describe('isParentPermission', () => {
    test('parent star permissions', () => {
      expect(isParentPermission('*', 'aliens.spy')).toBeTruthy()
      expect(isParentPermission('humans.*', 'humans.males.work')).toBeTruthy()
      expect(isParentPermission('humans.*', 'humans.females.rule')).toBeTruthy()
      expect(isParentPermission('humans.*', 'aliens.spy')).toBeFalsy()
      expect(isParentPermission('humans.*', 'aliens.spy')).toBeFalsy()
    })
    test('long permissions', () => {
      expect(isParentPermission('humans.need.to.work.together', 'humans.need.to.fight')).toBeFalsy()
      expect(isParentPermission('humans.need.to.work.together', 'humans.need.to.work')).toBeFalsy()
      expect(isParentPermission('humans.need.to.work.*', 'humans.need.to.work.together')).toBeTruthy()
      expect(isParentPermission('humans.are.super.weird', 'humans.are.*')).toBeFalsy()
    })
    test('actual permissions', () => {
      expect(isParentPermission('officers.*', 'officers.view')).toBeTruthy()
      expect(isParentPermission('officers.*', 'officers.approvals.*')).toBeTruthy()
      // this is not parent permission
      expect(isParentPermission('officers.approvals.*', 'officers.approvals.*')).toBeFalsy()
    })
    test('obviously wrong', () => {
      expect(isParentPermission('officers.*', 'records.view')).toBeFalsy()
      expect(isParentPermission('officers.view', 'records.view')).toBeFalsy()
      expect(isParentPermission('records', 'records.view')).toBeFalsy()
    })
    test('nulls | undefined', () => {
      expect(isParentPermission('officers.*', null)).toBeFalsy()
      expect(isParentPermission('officers.view', undefined)).toBeFalsy()
      expect(isParentPermission('records.*', 0)).toBeFalsy()
      expect(isParentPermission(null, 'records.view')).toBeFalsy()
      expect(isParentPermission(undefined, 'records.view')).toBeFalsy()
      expect(isParentPermission(0, 'records.view')).toBeFalsy()
    })
  })
  describe('hasPermission helper func', () => {
    let userPermissions = [
      'admin.*'
    ]
    cases('has star permissions', opts => {
      expect(hasPermission(opts.userPermissions, opts.permission)).toBeTruthy()
    }, [
      { name: 'admin.accounts.*', userPermissions, permission: 'admin.accounts.*' },
      { name: 'admin.roles.*', userPermissions, permission: 'admin.roles.*' },
      { name: 'admin.teams.*', userPermissions, permission: 'admin.teams.*' },
      { name: 'admin.documents.test.view', userPermissions, permission: 'admin.documents.test.view' },
      { name: 'admin.this.test.is.way.too.long', userPermissions, permission: 'admin.this.test.is.way.too.long' }
    ])

    cases('outside star permissions', opts => {
      expect(hasPermission(opts.userPermissions, opts.permission)).toBeFalsy()
    }, [
      { name: 'map.tools.*', userPermissions, permission: 'map.tools.*' },
      { name: 'records.view', userPermissions, permission: 'records.view' },
      { name: 'search', userPermissions, permission: 'search' },
      { name: 'records.view', userPermissions, permission: 'records.view' },
      { name: 'map.roles.create', userPermissions, permission: 'map.roles.create' }
    ])

    userPermissions = [
      'admin.roles.delete',
      'admin.accounts.create',
      'admin.teams.edit'
    ]

    cases('does not have view', opts => {
      expect(hasPermission(opts.userPermissions, opts.permission)).toBeFalsy()
    }, [
      { name: 'admin.roles.view', userPermissions, permission: 'admin.roles.view' },
      { name: 'admin.accounts.view', userPermissions, permission: 'admin.accounts.view' },
      { name: 'admin.teams.view', userPermissions, permission: 'admin.teams.view' }
    ])

    cases('random cases', opts => {
      expect(hasPermission(opts.userPermissions, opts.permission)).toBeFalsy()
    }, [
      { name: 'random 1', userPermissions: ['party.*'], permission: 'tenure.*' },
      { name: 'random 2', userPermissions: ['tenure.*'], permission: 'party.*' },
      { name: 'random 3', userPermissions: ['admin.*'], permission: 'tenure.*' },
      { name: 'random 4', userPermissions: ['map.*'], permission: 'tenure.*' },
      { name: 'random 5', userPermissions: ['teams.*'], permission: 'tenure.*' },
      { name: 'random 6', userPermissions: ['party.document.upload'], permission: 'party.document.*' }
    ])

    it('handles array of permissions', () => {
      expect(hasPermission(['*'], ['roles.view', 'roles.create', 'roles.delete'])).toBeTruthy()
      expect(hasPermission(['roles.*'], ['roles.view', 'roles.create', 'roles.delete'])).toBeTruthy()
      expect(hasPermission(['roles.view', 'roles.create', 'roles.delete'], ['roles.view', 'roles.create', 'roles.delete'])).toBeTruthy()
      expect(hasPermission(['roles.create', 'roles.delete'], ['roles.create', 'roles.edit'])).toBeFalsy()
      expect(hasPermission(['roles.edit', 'roles.create', 'roles.view'], ['roles.edit', 'roles.create', 'roles.view', 'accounts.remove'])).toBeFalsy()
      expect(hasPermission(['admin.accounts.edit'], ['admin.accounts.edit', 'admin.accounts.delete'])).toBeFalsy()
      expect(hasPermission(['admin.accounts.delete'], ['admin.accounts.edit', 'admin.accounts.delete'])).toBeFalsy()
      expect(hasPermission(['admin.accounts.edit', 'admin.accounts.delete'], ['admin.accounts.edit', 'admin.accounts.delete'])).toBeTruthy()
    })

    it('officer permissions', () => {
      expect(hasPermission(
        ['areas.approvals.office.*'],
        'areas.approvals.officer.576c7810-7fd0-4d53-815e-8f38163de8b0.edit'
      )).toBeFalsy()
    })
  })
})

test.skip('performance', () => {
  console.time('new')
  for (let i = 0; i < 1e6; i++) {
    hasPermission(['admin.accounts.edit', 'admin.accounts.delete'], ['admin.accounts.edit', 'admin.accounts.delete'])
  }
  console.timeEnd('new')

  console.time('old')
  for (let i = 0; i < 1e6; i++) {
    hasPermission__deprecated(['admin.accounts.edit', 'admin.accounts.delete'], ['admin.accounts.edit', 'admin.accounts.delete'])
  }
  console.timeEnd('old')
})
