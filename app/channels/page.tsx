"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil, Trash2 } from 'lucide-react'

// Mock data for channels
const initialChannels = [
  { id: 1, name: 'general', type: 'text' },
  { id: 2, name: 'voice-chat', type: 'voice' },
  { id: 3, name: 'announcements', type: 'text' },
]

export default function ChannelsPage() {
  const [channels, setChannels] = useState(initialChannels)
  const [selectedChannel, setSelectedChannel] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleEditChannel = (channel) => {
    setSelectedChannel(channel)
    setIsDialogOpen(true)
  }

  const handleDeleteChannel = (channelId) => {
    setChannels(channels.filter(channel => channel.id !== channelId))
  }

  const handleSaveChannel = (e) => {
    e.preventDefault()
    if (selectedChannel) {
      setChannels(channels.map(channel => 
        channel.id === selectedChannel.id ? selectedChannel : channel
      ))
    } else {
      setChannels([...channels, { ...selectedChannel, id: channels.length + 1 }])
    }
    setIsDialogOpen(false)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Channels</h1>
      <Button onClick={() => { setSelectedChannel(null); setIsDialogOpen(true); }} className="mb-4">
        Add New Channel
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {channels.map((channel) => (
            <TableRow key={channel.id}>
              <TableCell>{channel.name}</TableCell>
              <TableCell>{channel.type}</TableCell>
              <TableCell>
                <Button variant="outline" size="icon" onClick={() => handleEditChannel(channel)} className="mr-2">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => handleDeleteChannel(channel.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedChannel ? 'Edit Channel' : 'Add New Channel'}</DialogTitle>
            <DialogDescription>Make changes to the channel here. Click save when you're done.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveChannel}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={selectedChannel?.name || ''}
                  onChange={(e) => setSelectedChannel({ ...selectedChannel, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <select
                  id="type"
                  value={selectedChannel?.type || 'text'}
                  onChange={(e) => setSelectedChannel({ ...selectedChannel, type: e.target.value })}
                  className="col-span-3"
                >
                  <option value="text">Text</option>
                  <option value="voice">Voice</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

