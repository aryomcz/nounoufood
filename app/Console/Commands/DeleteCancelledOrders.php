<?php

namespace App\Console\Commands;

use App\Models\Order;
use Illuminate\Console\Command;

class DeleteCancelledOrders extends Command
{
    protected $signature = 'orders:delete-pending';
    protected $description = 'Hapus order dengan status 0 setiap hari';

    public function handle()
    {
        $count = Order::where('status', 0)->delete();

        $this->info("{$count} order dengan status 0 berhasil dihapus.");

        return Command::SUCCESS;
    }
}
