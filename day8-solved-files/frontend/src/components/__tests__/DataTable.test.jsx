<<<<<<< HEAD
// RTL test against the DataTable compound component.
=======
// TICKET-ADV125 — RTL test against the DataTable compound component.
>>>>>>> c2757038 (daywise-files)
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import DataTable from '../DataTable.jsx';

describe('<DataTable>', () => {
  it('renders columns and rows', () => {
    render(
      <DataTable>
        <DataTable.Header columns={[{ key: 'a', label: 'Alpha' }, { key: 'b', label: 'Beta' }]} />
        <DataTable.Body rows={[{ id: 1 }, { id: 2 }]} render={(r) => <span>row {r.id}</span>} />
      </DataTable>
    );
<<<<<<< HEAD
    expect(screen.getByRole('button', { name: 'Alpha' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Beta' })).toBeInTheDocument();
    expect(screen.getByText('row 1')).toBeInTheDocument();
    expect(screen.getByText('row 2')).toBeInTheDocument();
=======
    // TODO(TICKET-ADV125): write assertion — column labels "Alpha" / "Beta"
    //                     should appear in the document.
    // TODO(TICKET-ADV125): write assertion — rendered rows "row 1" / "row 2"
    //                     should appear in the document.
>>>>>>> c2757038 (daywise-files)
  });

  it('invokes onSortChange when a header is clicked', async () => {
    const onSortChange = vi.fn();
    render(
      <DataTable onSortChange={onSortChange}>
        <DataTable.Header columns={[{ key: 'a', label: 'Alpha' }]} />
        <DataTable.Body rows={[]} render={() => null} />
      </DataTable>
    );
    await userEvent.click(screen.getByText('Alpha'));
<<<<<<< HEAD
    expect(onSortChange).toHaveBeenCalledWith('a');
=======
    // TODO(TICKET-ADV125): write assertion — onSortChange should have been
    //                     called with the clicked column key ('a').
>>>>>>> c2757038 (daywise-files)
  });
});
